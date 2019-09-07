import React, { Component } from 'react';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import '../css/ContactScreen.css';


class ContactScreen extends Component {
  render() {
    return (
      <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
        <Header title='全体連絡' />
        <SideMenu />
      </div>
    );
  }
}

export default ContactScreen
