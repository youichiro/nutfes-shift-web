import React, { Component } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { withRouter } from 'react-router-dom'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import DescriptionIcon from '@material-ui/icons/Description';
import PeopleIcon from '@material-ui/icons/People';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

import ClickOutside from './SideMenuClickOutside';


class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }
  isActive(eventKey) {
    if (this.props.location.state === undefined) {
      return eventKey === 'shift' ? true : false
    } else if (eventKey === this.props.location.state.screen) {
      return true
    }
  }
  render() {
    return (
      <ClickOutside
        onClickOutside={() => this.setState({ expanded: false })}
      >
        <SideNav
          onSelect={ (selected) => {
            this.props.history.push({
              pathname: '/' + selected,
              state: { screen: selected }
            });
          }}
          style={{ backgroundColor: 'mediumseagreen', width: 64 }}
          expanded={this.state.expanded}
          onToggle={(expanded) => this.setState({ expanded })}
        >
          <SideNav.Toggle />
          <SideNav.Nav>
            <NavItem eventKey="shift" active={this.isActive('shift')}>
              <NavIcon>
                <ViewComfyIcon/>
              </NavIcon>
              <NavText>
                全体シフト
              </NavText>
            </NavItem>
            <NavItem eventKey="manual" active={this.isActive('manual')}>
              <NavIcon>
                <DescriptionIcon/>
              </NavIcon>
              <NavText>
                マニュアル
              </NavText>
            </NavItem>
            <NavItem eventKey="members" active={this.isActive('members')}>
              <NavIcon>
                <PeopleIcon/>
              </NavIcon>
              <NavText>
                名簿
              </NavText>
            </NavItem>
            <NavItem eventKey="contacts" active={this.isActive('contacts')}>
              <NavIcon>
                <ImportContactsIcon/>
              </NavIcon>
              <NavText>
                全体連絡
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </ClickOutside>
    );
  }
}

export default withRouter(SideMenu);
