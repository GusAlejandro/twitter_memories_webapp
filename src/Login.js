import React from 'react';
import './Register.css';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';


class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            username : '',
            password : '',
            isSubmitting: false,
            showError: false,
            errorMessage: ''
        };
    
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.buttonRef = React.createRef();

        this.loginUser = this.loginUser.bind(this);
        this.dismissErrorAlert = this.dismissErrorAlert.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        
        if (localStorage.getItem('access-token') && localStorage.getItem('refresh-token')) {
            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token');
        }
        
    }

    loginUser (event) {
        this.setState({
            isSubmitting: true,
            showError: false,
        })
        let username = this.state.username;
        let password = this.state.password;

        axios.post(
            process.env.REACT_APP_URL+'/login',
            {'username': username, 'password': password}
        ).then( (response) => {
            this.setState({ isSubmitting : false })
            if (response.data['access_token']) {
                // successful login 
                // store tokens in local storage 
                localStorage.setItem('access-token', response.data['access_token']);
                localStorage.setItem('refresh-token', response.data['refresh_token']);
                this.props.history.push('/');
                // route to '/'
            }
        }).catch((error) => {
            this.setState({ isSubmitting : false })
            if (error.response) {
                this.setState({
                    showError: true,
                    errorMessage: error.response.data['Error']
                })
            } else if (!error.response || error.request) {
                this.setState({
                    showError: true,
                    errorMessage: 'Server or connection error. Try again.'
                })
            }    
        })


        event.preventDefault();
    }

    dismissErrorAlert () {
        this.setState({
            showError: false,
            errorMessage: ''
        })
    }

    handlePassword () {
        const value = this.passwordRef.current.value;
        this.setState({
            password: value
        })
    }

    handleUsername () {
        const value = this.usernameRef.current.value;
        this.setState({
            username: value
        })
    }


    render () {

        const errorAlertStyle = this.state.showError ? {} : { display: 'none'};

        return (
            <div>
                <Navigation display={false}/>
                <div className='register'>
                    <h1 style={{ textAlign: 'center'}}>Login</h1>
                    
                    <Alert variant='danger' style={errorAlertStyle} onClose={this.dismissErrorAlert} dismissible='true'>{this.state.errorMessage}</Alert>
                    
                    
                    <Form onSubmit={this.loginUser}> 
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control ref={this.usernameRef} type="username" placeholder="" onChange={this.handleUsername} value={this.state.username}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={this.passwordRef} type="password" placeholder="" onChange={this.handlePassword} value={this.state.password}/>
                        </Form.Group>
                        
                        <Form.Text className="text-muted" style={{marginBottom: '1%'}}>
                            Don't have an account ? Sign up <Link to='/signup'>here.</Link>
                        </Form.Text>

                        
                        <Button variant="primary" type="submit" ref={this.buttonRef} disabled={this.state.isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;