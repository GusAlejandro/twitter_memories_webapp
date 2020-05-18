import React from 'react';
import './Welcome.css';
import { Jumbotron, Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {
    render () {
        return (
            <div className='midContent'>
                <Jumbotron className='customJumbotron'>
                    <h1>View Your Past Tweets</h1>
                    <p>
                    <b>Twitter Memories</b> is a third-party app that allows you to view 
                    what you tweeted on this day, in the past. In order to use this app you need your Twitter Archive, 
                    which you can request from Twitter 
                    <a target="_blank" rel="noopener noreferrer"  href='https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive'> here</a>. 
                    This website is not affiliated with Twitter and the account you create is independent of your own Twitter account. If you have any
                    questions, send them to <a target='_blank' rel="noopener noreferrer"  href='https://twitter.com/GusAlejandro_'>@GusAlejandro_.</a>
                    </p>
                    <div className='buttonRow'>
                        <Link to='/signup'>
                            <Button className='customButton' variant='primary'>Sign Up</Button>
                        </Link>
                        <span style={{width: '2%'}}></span>
                        <Link to='/login'>
                            <Button className='customButton' variant='primary'>Login</Button>
                        </Link>
                    </div>
                    
                </Jumbotron>
            </div>
        );
    }
}


export default Welcome;