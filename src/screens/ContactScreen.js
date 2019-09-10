import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core'
import renderHTML from 'react-render-html';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';


const env = require('../env.json').PRODUCTION;


class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactData: null,
    }
  }
  componentDidMount() {
    this.setContactData();
  }
  setContactData() {
    this.setState({ contactData: null });
    const request = axios.create({
      baseURL: env.CONTACT_API_URL,
      responseType: 'json',
    });
    request.get()
      .then(res => {
        this.setState({ contactData: res.data });
      })
      .catch(error => {
        alert('APIの呼び出しに失敗しました');
        console.log(error);
      });
  }
  renderContactCards() {
    let cards = [];
    this.state.contactData.forEach((contact, i) => {
      let link = env.CONTACT_PAGE_URL_BASE + contact.id;
      cards.push(
        <Card style={{ margin: 20 }}>
          <CardContent>
            <Typography style={styles.title}>
              {contact.title}
            </Typography>
            <Typography>
              {renderHTML(contact.text)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' href={link} target='_blank'>open page</Button>
          </CardActions>
        </Card>
      );
    })
    return cards;
  }
  render() {
    if (this.state.contactData === null) {
      return <p>loading...</p>
    }
    return (
      <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
        <Header title='全体連絡' />
        <SideMenu />
        <div style={{ marginLeft: 64, marginTop: 70 }}>
          {this.renderContactCards()}
        </div>
      </div>
    );
  }
}

const styles = {
  title: {
    fontSize: 28,
    marginBottom: 10,
  }
}

export default ContactScreen
