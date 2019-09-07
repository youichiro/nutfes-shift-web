import React, { Component } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import '../css/MemberListScreen.css';


const env = require('../env.json').PRODUCTION;


class MemberListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberData: null,
    }
  }
  componentDidMount() {
    this.setMemberData();
  }
  async setMemberData() {
    this.setState({ memberData: null });
    const request = axios.create({
      baseURL: env.MEMBER_LIST_API_URL,
      responseType: 'json',
    });
    await request.get()
      .then(res => {
        this.setState({ memberData: res.data });
      })
      .catch(error => {
        alert('APIの呼び出しに失敗しました');
        console.log(error);
      });
  }
  renderMemberListView() {
    const memberData = this.state.memberData;
    let categories = memberData.map((item) => { return item.belong_category });
    categories = Array.from(new Set(categories));
    let columns = [];
    categories.forEach((category, index) => {
      let color = '';
      let members = memberData.map(item => {
        if (item.belong_category === category) {
          color = item.color;
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {item.belong_subcategory ? <span style={{ fontSize: 12, width: 120 }}>{item.belong_subcategory}</span> : <span></span>}
              <span style={{ fontSize: 14, width: 200 }}>{item.name}</span>
            </div>
          )
        }
      });
      let columnDiv = [
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 20, color: color, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10 }}>{category}</span>
          <div style={{ height: 1, backgroundColor: '#F2F2F2', marginBottom: 10 }}></div>
          {members}
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
    if (this.state.memberData === null) {
      return <p>loading...</p>
    }
    return (
      <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
        <Header title='名簿' />
        <SideMenu />
        <div style={{ marginLeft: 64, marginTop: 50 }}>
          {this.renderMemberListView()}
        </div>
      </div>
    );
  }
}

export default MemberListScreen
