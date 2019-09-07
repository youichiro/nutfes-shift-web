import React, { Component } from 'react';


class Header extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.leftText}>
          <span>{this.props.title}</span>
        </div>
        <div style={styles.rightText}>
          <span>NUTFES SHIFT APP</span>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    width: '100vw',
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#F2F2F2',
    verticalAlign: 'middle',
    paddingLeft: 64,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    zIndex: 3,
  },
  leftText: {
    paddingLeft: 30,
    fontSize: 18,
    marginRight: 'auto'
  },
  rightText: {
    fontSize: 14,
    paddingRight: 30,
  },
}

export default Header;
