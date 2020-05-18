import React from 'react';
import './Register.css';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Login extends React.Component {


    render () {
        return (
            <div className='register'>
                <h1 style={{ textAlign: 'center'}}>Login</h1>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="" />
                    </Form.Group>
                    
                    <Form.Text className="text-muted" style={{marginBottom: '1%'}}>
                        Don't have an account ? Sign up <Link to='/signup'>here.</Link>
                    </Form.Text>

                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Login;