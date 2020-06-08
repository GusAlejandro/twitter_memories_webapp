import React from 'react';
import './Home.css';
import Welcome from './Welcome';
import Upload from './Upload'
import Feed from './Feed'
import axios from 'axios';

// TODO: Implement File upload component 
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

        axios.get(
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
            <div className="parent">
                {isLoggedIn ? file_status == 0 ? <Upload/> : <Feed/> : <Welcome/>}
            </div>
        );
    }


}

export default Home;