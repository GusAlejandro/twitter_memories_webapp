import React from 'react';
import './Navigation.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

class Navigation extends React.Component {
  
  static getCurr() {
    console.log(useLocation().pathname)
    return useLocation().pathname;
  }
  
  render () {
    let upperRightLink;

    if (this.getCurr === '/') {
      upperRightLink = <Nav.Link href='#'>Login</Nav.Link>;
    }

    return (
      <Navbar bg='dark' variant='dark'>
        <Link to='/'>
          <Navbar.Brand>Twitter Memories</Navbar.Brand>
        </Link>
        <Nav className='navLinks'>
            {upperRightLink}
            {/* <Nav.Link href='#'>Login</Nav.Link> */}
            {/* <Nav.Link href='#'>Logout</Nav.Link> */}
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;