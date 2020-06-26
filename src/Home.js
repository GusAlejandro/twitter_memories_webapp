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
        
        this.getCurrentDate = this.getCurrentDate.bind(this);

        this.state = {
            isLoggedIn : tokens_exist,
            file_status : null,
            tweets: []
        }
    }

    getCurrentDate () {
        let curr_date = new Date();
        let months = [
            'Jan', 
            'Feb', 
            'Mar', 
            'Apr', 
            'May', 
            'Jun', 
            'Jul', 
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ]
        return [
            months[curr_date.getMonth()], 
            curr_date.getDate()
        ]
    }

    componentDidMount () {
        // call the endpoint to get file status and use it to conditionally render components
        const isLoggedIn = this.state.isLoggedIn;
        const config = {
            params: {
                "month": this.getCurrentDate()[0], "date": this.getCurrentDate()[1]    
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            }
        }
        axios.get(
            process.env.REACT_APP_URL + '/feed',
            config
        ).then( (response) => {
            this.setState({ file_status: response.data['file_status'] });
            console.log(this.state.file_status);
            this.setState({ tweets: response.data['tweets']})
        })
    }


    render () {

        const isLoggedIn = this.state.isLoggedIn;
        const file_status = this.state.file_status;
        console.log(file_status)

        return (
            <div className="parent">
                {isLoggedIn ? file_status == 0 ? <Upload/> : <Feed tweets={this.state.tweets}/> : <Welcome/>}
            </div>
        );
    }


}

export default Home;