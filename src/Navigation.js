import React from 'react';
import './Navigation.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {

  constructor(props){
    super(props);

    const tokens_exist = localStorage.getItem('access-token') && localStorage.getItem('refresh-token');
    this.handleLogOut = this.handleLogOut.bind(this);
    

    this.state = {
      isLoggedIn: tokens_exist
    }

  }

  handleLogOut (event) {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    this.props.history.push('/')
    event.preventDefault();
  }
  
  render () {

    const logOutStyle = this.props.display ? this.state.isLoggedIn ? {} : {display: 'none'} : {display: 'none'};


    return (
      <div>
      <Navbar bg='dark' variant='dark'>
        <Link to='/'>
          <Navbar.Brand>Twitter Memories (Beta)</Navbar.Brand>
        </Link>
        <Navbar.Collapse className="justify-content-end">
          <div style={logOutStyle}>
            <Navbar.Text>
              <Nav.Link onClick={this.handleLogOut} href='/'>Log Out</Nav.Link>
            </Navbar.Text>
          </div>  
        </Navbar.Collapse>
      </Navbar>
      </div>
    );
  }
}

export default Navigation;