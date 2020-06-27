import React from 'react';
import './Feed.css';
import { Tweet } from 'react-twitter-widgets';

class Feed extends React.Component {

    constructor(props){
        super(props);


    }

  
    render () {

        let tweets = this.props.tweets;
        let formatted_tweets = tweets.map(function(tweet){
            return <Tweet tweetId={tweet} options={{ theme: "dark" }} />
        })

        return (
            <ul>{formatted_tweets}</ul>
        )
    };
}

export default Feed;