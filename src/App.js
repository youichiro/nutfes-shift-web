import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios';

import Auth from './components/Auth';
import LoginScreen from './screens/LoginScreen';
import ShiftScreen from './screens/ShiftScreen';
import TaskShiftScreen from './screens/TaskShiftScreen';
import ManualListScreen from './screens/ManualListScreen';
import MemberListScreen from './screens/MemberListScreen';
import ContactScreen from './screens/ContactScreen';

const env = require('./env.json').PRODUCTION;


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      username: null,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  async handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    await this.getUsername(email);

    if (this.state.username && password === env.PASSWORD) {
      this.setState({ isLoggedIn: true });
    } else {
      alert('メールアドレスもしくはパスワードが違います');
    }
  }
  async getUsername(email) {
    if (email) {
      const request = axios.create({
        baseURL: `${env.NUTFES_EMAIL_API_BASE_URL}/${email}`,
        responseType: 'json',
      });
      await request.get()
        .then(res => {
          this.setState({ username: res.data });
        })
        .catch(error => {
          alert('APIの呼び出しに失敗しました');
          console.log(error);
        })
    }
  }
  render() {
    return (
      <div style={styles.container}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => <LoginScreen handleLogin={this.handleLogin} />} />
            <Route path='/login' render={() => <LoginScreen handleLogin={this.handleLogin} />} />
            <Auth currentUser={{ isLoggedIn: this.state.isLoggedIn }}>
              <Route
                path='/shift'
                render={() => <ShiftScreen username={this.state.username} />}
              />
              <Route path='/task_shift' component={TaskShiftScreen} />
              <Route path='/manual' component={ManualListScreen} />
              <Route path='/members' component={MemberListScreen} />
              <Route path='/contacts' component={ContactScreen} />
            </Auth>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: 0
  }
}
