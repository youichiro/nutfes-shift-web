import React, { Component } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { withRouter } from 'react-router-dom'

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import DescriptionIcon from '@material-ui/icons/Description';
import PeopleIcon from '@material-ui/icons/People';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';


class SideMenu extends Component {
  render() {
    return (
      <SideNav
        onSelect={(selected) => {
          this.props.history.push('/'+selected);
        }}
        style={{ backgroundColor: 'mediumseagreen', width: 64 }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="shift">
          <NavItem eventKey="shift">
            <NavIcon>
              <ViewComfyIcon/>
            </NavIcon>
            <NavText>
              全体シフト
            </NavText>
          </NavItem>
          <NavItem eventKey="manual">
            <NavIcon>
              <DescriptionIcon/>
            </NavIcon>
            <NavText>
              マニュアル
            </NavText>
          </NavItem>
          <NavItem eventKey="members">
            <NavIcon>
              <PeopleIcon/>
            </NavIcon>
            <NavText>
              名簿
            </NavText>
          </NavItem>
          <NavItem eventKey="contacts">
            <NavIcon>
              <ImportContactsIcon/>
            </NavIcon>
            <NavText>
              全体連絡
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }
}

export default withRouter(SideMenu);
