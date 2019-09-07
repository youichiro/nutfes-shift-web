import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import Dialog from 'react-bootstrap-dialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import '../css/ShiftScreen.css';

const env = require('../env.json').PRODUCTION;
const SHEET_DIC = {
  1: '準備日晴れ',
  2: '準備日雨',
  3: '1日目晴れ',
  4: '1日目雨',
  5: '2日目晴れ',
  6: '2日目雨',
  7: '片付け日晴れ',
  8: '片付け日雨',
}
const TIMES = {
  '06:00': 1, '06:30': 2, '07:00': 3, '07:30': 4,
  '08:00': 5, '08:30': 6, '09:00': 7, '09:30': 8,
  '10:00': 9, '10:30': 10, '11:00': 11, '11:30': 12,
  '12:00': 13, '12:30': 14, '13:00': 15, '13:30': 16,
  '14:00': 17, '14:30': 18, '15:00': 19, '15:30': 20,
  '16:00': 21, '16:30': 22, '17:00': 23, '17:30': 24,
  '18:00': 25, '18:30': 26, '19:00': 27, '19:30': 28,
  '20:00': 29, '20:30': 30, '21:00': 31, '21:30': 32,
  '22:00': 33, '22:30': 34, '23:00': 35, '23:30': 36,
}


class ShiftScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shiftData: null,
      sheetID: null,
      taskDetailVisible: false,
      taskDetails: {
        name: '',
        belong: '',
        task: '',
        description: '',
        time: '',
        place: '',
        manualURL: '',
        members: null,
        start_time_id: null,
        end_time_id: null,
      },
      currentTimeID: null,
      username: null,
      weather: null,
    };
    this.onTaskClick = this.onTaskClick.bind(this);
  }
  async componentDidMount() {
    this.setCurrentTime();
    await this.setWeather();
    await this.setSheetID();
    await this.setShiftData();
  }
  async setWeather() {
    const request = axios.create({
      baseURL: env.WEATHER_API_URL,
      responseType: 'json',
    });
    await request.get()
      .then(res => {
        this.setState({ weather: res.data });
      })
      .catch(error => {
        alert('APIの呼び出しに失敗しました');
        console.log(error);
      })
  }
  async setSheetID() {
    // 現在の日付に応じてsheetIDを変更
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    let sheetID = this.state.weather === '晴' ? 3 : 4; // デフォルトで1日目を表示
    if (month === 9) {
      switch (date) {
        case 13:
          sheetID = this.state.weather === '晴' ? 1 : 2;  // 準備日
          break;
        case 14:
          sheetID = this.state.weather === '晴' ? 3 : 4; // 1日目
          break;
        case 15:
          sheetID = this.state.weather === '晴' ? 5 : 6; // 2日目
          break;
        case 16:
          sheetID = this.state.weather === '晴' ? 7 : 8; // 片付け日
          break;
      }
    }
    await this.setState({ sheetID: sheetID });
  }
  setCurrentTime() {
    setInterval(() => {
      let now = new Date();
      let hour = ('0' + now.getHours().toString()).slice(-2);
      let minutes = now.getMinutes() < 30 ? '00' : '30';
      let currentTime = hour + ':' + minutes;
      let currentTimeID = currentTime in TIMES ? TIMES[currentTime] : 0;
      this.setState({ currentTimeID: currentTimeID });
    }, 5000)
  }
  async setShiftData() {
    this.setState({ shiftData: null });
    let shiftData = [];
    for (let sheetID in SHEET_DIC) {
      const request = axios.create({
        baseURL: `${env.SHIFT_DATA_API_BASE_URL}/${sheetID}`,
        responseType: 'json',
      });
      await request.get()
        .then(res => {
          shiftData.push(res.data);
        })
        .catch(error => {
          alert('APIの呼び出しに失敗しました');
          console.log(error);
        });
    }
    this.setState({ shiftData: shiftData });
  }
  setSameTimeMembers(sheet_name, task_name, start_time_id, end_time_id) {
    if (this.state.taskDetailVisible) {
      if (!task_name) {
        this.setState({
          taskDetails: {
            ...this.state.taskDetails,
            members: []
          }
        });
        return
      }
      const request = axios.create({
        baseURL: `${env.SAME_TIME_MEMBERS_API_BASE_URL}/${sheet_name}/${task_name}/${start_time_id}/${end_time_id}`,
        responseType: 'json',
      });
      request.get()
        .then(res => {
          this.setState({
            taskDetails: {
              ...this.state.taskDetails,
              members: res.data
            }
          });
        })
        .catch(error => {
          alert('APIの呼び出しに失敗しました');
          console.log(error);
        })
    }
  }
  renderSheetSelectBox() {
    return (
      <form style={{ display: 'flex', flexWrap: 'wrap' }} autoComplete='off'>
        <FormControl>
          <InputLabel htmlFor='age-simple'>シート</InputLabel>
          <Select
            value={this.state.sheetID}
            onChange={ async(e) => {
              await this.setState({ sheetID: e.target.value });
            }}
            renderValue={value => <span style={{ fontSize: 10 }}>{SHEET_DIC[value]}</span>}
          >
            <MenuItem value={1}>準備日晴れ</MenuItem>
            <MenuItem value={2}>準備日雨</MenuItem>
            <MenuItem value={3}>1日目晴れ</MenuItem>
            <MenuItem value={4}>1日目雨</MenuItem>
            <MenuItem value={5}>2日目晴れ</MenuItem>
            <MenuItem value={6}>2日目雨</MenuItem>
            <MenuItem value={7}>片付け日晴れ</MenuItem>
            <MenuItem value={8}>片付け日雨</MenuItem>
          </Select>
        </FormControl>
      </form>
    )
  }
  renderShiftTable() {
    let shifts = this.state.shiftData[this.state.sheetID-1].data;
    let ths = [<th className="thead-th-first-child"><div>{this.renderSheetSelectBox()}</div></th>];
    let rows = [];
    for(let time in TIMES){
      let currentTimeStyle = null;
      if (this.state.currentTimeID === TIMES[time]) {
        currentTimeStyle = { backgroundColor: 'coral' };
      }
      rows.push(
        [<th className="th-first-child" style={currentTimeStyle}><div className='timeCell'>{time}</div></th>]
      );
    }
    shifts.forEach((data, i) => {
      let row_num = 0;
      ths.push(
        <th className="th">
          <div className="nameCell">
            <span style={{ color: data.belong.color }}>{data.belong.category_name}</span>
            <br/>
            {data.name}
          </div>
        </th>
      );
      data.tasks.forEach((task, j) => {
        let taskCellStyle = { backgroundColor: task.color };
        if (task.name) {
          if (this.state.currentTimeID >= task.start_time_id && this.state.currentTimeID <= task.end_time_id && task.name !== '×') {
            taskCellStyle = { borderWidth: 1, borderColor: 'red' };
          }
          rows[row_num].push(
            <td style={taskCellStyle} className="td" rowSpan={task.n_cell}
              onClick={ async() => {
                await this.setState({
                  taskDetailVisible: true,
                  taskDetails: {
                    name: data.name,
                    belong: data.belong.category_name + '/' + data.belong.subcategory_name,
                    task: task.name,
                    description: task.description,
                    place: task.place,
                    time: task.time,
                    manualURL: task.manual_url,
                    members: task.members,
                    start_time_id: task.start_time_id,
                    end_time_id: task.end_time_id,
                  }
                });
                this.onTaskClick();
              }}
            >
              <div className="taskCell">{task.name}</div>
            </td>
          );
          if (task.n_cell > 1) {
            row_num += task.n_cell - 1;
          }
        } else {
          rows[row_num].push(<td style={taskCellStyle} className="td"></td>);
        }
        row_num += 1;
      })
      for (let i = row_num; i < rows.length; i++) {
        rows[i].push(<td style={{ backgroundColor: 'white' }} className="td"></td>);
      }
    })
    const tbody = rows.map(tds => <tr>{tds}</tr>);

    return (
      <table className="table">
        <thead className="thead">
          <tr> {ths} </tr>
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </table>
    )
  }
  renderTaskDetailView() {
    if (!this.state.taskDetailVisible) {
      return (
        <p>loading...</p>
      )
    }
    // 同じ時間帯のメンバーを取得
    if (this.state.taskDetails.members.length === 0) {
      this.setSameTimeMembers(
        SHEET_DIC[this.state.sheetID], this.state.taskDetails.task, this.state.taskDetails.start_time_id, this.state.taskDetails.end_time_id
      );
    }
    let memberView = [];
    const members = this.state.taskDetails.members;
    if (members.length === 0) {
      memberView = [<p style={{ fontSize: 14 }}>loading...</p>];
    } else {
      for (let i = 0; i < members.length; i += 2) {
        memberView.push(
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
              <span style={{ flex: 5, fontSize: 10, color: 'darkslategray', height: 4 }}>{members[i].belong} {members[i].grade} </span>
              <span style={{ flex: 6, fontSize: 12 }}>{members[i].name}</span>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
              <span style={{ flex: 5, fontSize: 10, color: 'darkslategray' }}>{members[i + 1].belong} {members[i + 1].grade} </span>
              <span style={{ flex: 6, fontSize: 12 }}>{members[i + 1].name}</span>
            </div>
          </div>
        )
      }
    }
    return (
      <div>
        <div style={{ height: 30, justifyContent: 'center' }}>
          <p style={{ fontSize: 20, textAlign: 'center' }}>{this.state.taskDetails.task}</p>
        </div>
        <div style={{ height: 24 }}>
          <p style={{ fontSize: 14 }}>
            場所：{this.state.taskDetails.place}
          </p>
        </div>
        <div style={{ height: 24 }}>
          <p style={{ fontSize: 14 }}>
            時間：{this.state.taskDetails.time}
          </p>
        </div>
        <div style={{ flexDirection: 'row', height: 24 }}>
          <span style={{ fontSize: 14 }}>
            マニュアル：
          </span>
          <span
            style={{ fontSize: 14, color: 'royalblue' }}
          >
            <a href={this.state.taskDetails.manualURL} target='_blank'>
              {this.state.taskDetails.manualURL}
            </a>
          </span>
        </div>
        <div style={{ marginTop: 5, marginBottom: 5, padding: 10, backgroundColor: 'honeydew' }}>
          <p style={{ fontSize: 12 }}>
            {this.state.taskDetails.description}
          </p>
        </div>
        <div style={{ alignItems: 'center', height: 24, marginTop: 16 }}>
          <p style={{ fontSize: 14 }}>
            同じ時間帯のメンバー
          </p>
        </div>
        <div style={{ marginTop: 5, marginBottom: 5, padding: 10, backgroundColor: 'beige' }}>
          {memberView}
        </div>
      </div>
    )
  }
  onTaskClick() {
    this.dialog.show({
      body: this.renderTaskDetailView(),
      bsSize: 'large',
    })
  }
  render() {
    if (this.state.shiftData === null) {
      return <p>Loading...</p>
    }
    const title = <span>全体シフト {SHEET_DIC[this.state.sheetID]}</span>;
    return (
      <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
        <Header title={title} />
        <SideMenu />
        <div style={{ paddingLeft: 64, paddingTop: 50 }}>
          {this.renderShiftTable()}
        </div>
        <Dialog ref={(e) => { this.dialog = e }} />
      </div>
    );
  }
}

export default withRouter(ShiftScreen);
