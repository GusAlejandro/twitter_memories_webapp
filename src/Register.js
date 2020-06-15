import React from 'react';
import './Register.css';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Register extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            'username' : '',
            'password' : '',
            'isSubmitting' : false, 
            'showSuccess': false,
            'showError': false, 
            'errorMessage': ''
        };


        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.buttonRef = React.createRef();

        this.registerUser = this.registerUser.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.dismissSuccessAlert = this.dismissSuccessAlert.bind(this);
        this.dismissErrorAlert = this.dismissErrorAlert.bind(this);
    }

    dismissErrorAlert () {
        this.setState({
            'showError': false,
            'errorMessage': ''
        })
    }

    handleUsername() {
        const value = this.usernameRef.current.value;
        this.setState({
            'username': value
        }, () => this.logFields())
    }

    handlePassword(){
        const value = this.passwordRef.current.value;
        this.setState({
            'password': value
        }, () => this.logFields())
    }

    dismissSuccessAlert() {
        this.setState({
            'showSuccess': false
        })
    }

    logFields = () => {
        const { username, password} = this.state;
        console.log(username + ' ' + password);
    }

    registerUser(event) {
        this.setState({
            'isSubmitting': true,
            'showError': false,
            'showSuccess': false
        })
        let username = this.state['username'];
        let password = this.state['password'];
        axios.post(
            'http://10.0.0.106:5000/register',
            {'username': username, 'password': password},
        ).then( (response) => {
            console.log(response.data)
            this.setState({
                'isSubmitting': false
            })
            if (response.data['username']) {
                // successful singup
                this.setState({
                    'username': '',
                    'password': '',
                    'showSuccess': true
                })
            }
        }
        ).catch((error) => {
            // do something here 
            if (error.response) {
                this.setState({
                    'showError': true,
                    'errorMessage': error.response.data['Error']
                })
            } else if (!error.response) {
                this.setState({
                    'showError': true,
                    'errorMessage': 'Server error. Try again.'
                })
            }
            // adding more cases here, not final
        }) 
        event.preventDefault();
    }


    render () {
        
        const successAlertStyle = this.state['showSuccess'] ? {} : { display : 'none'};
        const errorAlertStyle = this.state['showError'] ? {} : { display: 'none'};
        
        return (
            <div className='register'>
                <h1 style={{ textAlign: 'center'}}>Sign up for Twitter Memories</h1>

                <div className='successAlert'>
                    <Alert variant='success' dismissible='true' onClose={this.dismissSuccessAlert} style={successAlertStyle}>Your account has been successfully created. Click
                        <Link to='/login'> here </Link>
                        to Login.
                    </Alert>
                
        <Alert variant='danger' dismissible='true' onClose={this.dismissErrorAlert} style={errorAlertStyle}>{this.state['errorMessage']}</Alert>
                </div>

                <Form onSubmit={this.registerUser}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control ref={this.usernameRef} name='username' type="username" placeholder="" onChange={this.handleUsername} value={this.state['username']}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control ref={this.passwordRef} name='password' type="password" placeholder="" onChange={this.handlePassword} value={this.state['password']}/>
                    </Form.Group>

                    
                    
                    <Form.Text className="text-muted" style={{marginBottom: '1%'}}>
                        Already have an account ? Login <Link to='/login'>here.</Link>
                    </Form.Text>

                    
                    <Button variant="primary" type="submit" ref={this.buttonRef} disabled={this.state['isSubmitting']}>
                        Submit
                    </Button>
                </Form>

            </div>
        );
    }
}

export default Register;