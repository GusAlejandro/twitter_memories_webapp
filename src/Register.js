import React from 'react';
import './Register.css';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Register extends React.Component {


    render () {
        return (
            <div className='register'>
                <h1 style={{ textAlign: 'center'}}>Sign up for Twitter Memories</h1>
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
                        Already have an account ? Click here to <Link to='/login'>Login.</Link>
                    </Form.Text>

                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Register;