import React from 'react';
import './Home.css';
import Welcome from './Welcome';
import Navigation from './Navigation';
import axios from 'axios';

// TODO: refactor so that this is our top level component
// main div will go here and then we conditioonally render 
// feed if file status is 2, file upload if 1, welcome if isLoggedIn is false

class Home extends React.Component {

    constructor(props) {
        super(props);

        const tokens_exist = localStorage.getItem('access-token') && localStorage.getItem('refresh-token');
 
        this.state = {
            isLoggedIn : tokens_exist,
            file_status : null
        }
    }

    componentDidMount () {
        // call the endpoint to get file status and use it to conditionally render components
        const isLoggedIn = this.state.isLoggedIn;
        const http_headers = {
            headers : {
                'authorization': `Bearer ${localStorage.getItem('access-token')}`
            }
        };

        axios.post(
            'http://127.0.0.1:5000/feed', 
            http_headers 
        ).then( (response) => {
            this.setState({ file_status: response.data['file_status'] });
            console.log(this.state.file_status);
        })
    }


    render () {

        const isLoggedIn = this.state.isLoggedIn;
        const file_status = this.state.file_status;

        return (
            <h1>words go here</h1>
        )
    };


}

export default Home;