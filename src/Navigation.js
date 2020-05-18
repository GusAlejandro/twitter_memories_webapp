import React from 'react';
import './Navigation.css';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  
  render () {

    return (
      <Navbar bg='dark' variant='dark'>
        <Link to='/'>
          <Navbar.Brand>Twitter Memories</Navbar.Brand>
        </Link>
      </Navbar>
    );
  }
}

export default Navigation;