import React from 'react';
import './Feed.css';
import { Tweet } from 'react-twitter-widgets';

class Feed extends React.Component {

    constructor(props){
        super(props);


    }

  
    render () {
        const file_status = this.props.file_status;
        let tweets = this.props.tweets;
        let formatted_tweets = tweets.map(function(tweet){
            return <Tweet className="singleTweet" tweetId={tweet} options={{ theme: "dark"}} />
        })

        return (
            <div className="feed">
                {file_status == 1 
                    ? <h1>your tweets are being processed </h1> 
                    : <div>
                        <h1>Tweets Are below</h1>
                        <ul className="tweets">{formatted_tweets}</ul>
                    </div>
                }
            </div>
        )
    };
}

export default Feed;