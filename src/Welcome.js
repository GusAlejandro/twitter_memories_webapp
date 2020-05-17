import React from 'react';
import './Welcome.css';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {
    render () {
        return (
            <div className='midContent'>
                <Jumbotron className='customJumbotron'>
                    <h1>View Your Past Tweets</h1>
                    <p>
                    <b>Twitter Memories</b> is a third-party app that you can use to view 
                    what you tweeted today in the past. It uses your Twitter Archive, 
                    which you can request from Twitter 
                    <a target="_blank" href='https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive'> here</a>, 
                    so you don't need to sign in 
                    with Twitter, simply make an account here and uplaod your archive. 
                    </p>
                    <Link to='/register'>
                    <Button variant='primary'>Register</Button>
                    </Link>
                </Jumbotron>
            </div>
        );
    }
}


export default Welcome;