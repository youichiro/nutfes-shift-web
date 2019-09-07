import React, { Component } from 'react';
import { Button,  Form, FormGroup, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import '../css/LoginScreen.css';
import NutfesLogo from '../components/NutfesLogo';


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitialized: null,
      email: null,
      password: null,
      username: null,
    }
  }
  onSubmit = (e) => {
    this.props.handleLogin(e);
    this.props.history.push('/shift');
  }
  render() {
    return (
      <div>
        <header className="header">
          <p className='title'>NUTFES SHIFT APP</p>
          <NutfesLogo />
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input
                type='email'
                name='email'
                placeholder='Email'
                onChange={(event) => this.setState({ email: event.target.value })}
                style={{ width: '70vmin' }}
              />
              <Input
                type='password'
                name='password'
                placeholder='Password'
                onChange={(event) => this.setState({ password: event.target.value })}
                style={{ width: '70vmin' }}
              />
            </FormGroup>
            <Button
              type='submit'
              style={{ width: '70vmin' }}
            >
              Login
            </Button>
          </Form>

        </header>
      </div>
    );
  }
}

export default withRouter(LoginScreen);
