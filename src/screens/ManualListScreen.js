import React, { Component } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';


const env = require('../env.json').PRODUCTION;


class ManualListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manualData: null,
    };
  }
  componentDidMount() {
    this.setManualData();
  }
  async setManualData() {
    this.setState({ manualData: null });
    const request = axios.create({
      baseURL: env.MANUAL_API_URL,
      responseType: 'json',
    });
    await request.get()
      .then(res => {
        const manualData = res.data.sort((a, b) => {
          if (a.order === null && b.order === null) return 0;
          if (a.order === null) return 1;
          if (b.order === null) return -1;
          if (a.order < b.order) return -1;
          if (a.order > b.order) return 1;
          return 0;
        })
        this.setState({ manualData: manualData });
      })
      .catch(error => {
        alert('APIの呼び出しに失敗しました');
        console.log(error);
      });
  }
  renderManualListView() {
    const manualData = this.state.manualData;
    let categories = manualData.map((item) => { return item.category });
    categories = Array.from(new Set(categories));
    let columns = [];
    categories.forEach((category, index) => {
      let manuals = manualData.map(item => {
        if (item.category === category) {
          return (
            <span><a href={item.url} target='_blank'>{item.title}</a></span>
          )
        }
      });
      let columnDiv = [
        <div style={{ display: 'flex', flexDirection: 'column',  width: 700 }}>
          <span style={styles.category}>{category}</span>
          <div style={{ height: 1, backgroundColor: '#F2F2F2', marginBottom: 10 }}></div>
            {manuals}
        </div>
      ];
      columns.push(columnDiv);
    })
    return (
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', margin: 30 }}>
        {columns}
      </div>
    )
  }
  render() {
    if (this.state.manualData === null) {
      return <p>loading...</p>
    }
    return (
      <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
        <Header title='技大祭マニュアル' />
        <SideMenu />
        <div style={{ marginLeft: 64, marginTop: 50 }}>
          {this.renderManualListView()}
        </div>
      </div>
    );
  }
}

const styles = {
  category: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
  }
}

export default ManualListScreen
