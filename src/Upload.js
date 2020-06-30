import React from 'react';
import './Upload.css';
import { Form, Alert, Button, Jumbotron, Spinner } from 'react-bootstrap';
import axios from 'axios';

class Upload extends React.Component {

    constructor(props){
        super(props);
        
        this.fileRef = React.createRef();
        this.uploadFile = this.uploadFile.bind(this);
        this.dismissErrorAlert = this.dismissErrorAlert.bind(this);
        this.buttonRef = React.createRef();
        this.handleFile = this.handleFile.bind(this);

        this.state = {
            fileUploaded : false,
            errorOccured : false,
            isSubmitting: false, 
            errorMessage: ''
        }
    };

    uploadFile (event) {
        console.log("the uplaod button was clicked")
        this.setState({
            isSubmitting: true,
            errorOccured: false,
            errorMessage: ''
        })
        let formData = new FormData();
        const file = this.fileRef.current.files[0];
        formData.append('file', file)
        axios.post(
            process.env.REACT_APP_URL + '/upload', formData,
            { headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`
            }}
        ).then((response) => {
            this.setState({
                isSubmitting: false
            })
            // refresh the page
            this.props.parentCallback();
        }).catch((error) => {
            this.setState({
                isSubmitting: false,
                errorOccured: true,
                errorMessage: error.response.data['Error']
            })
        })

        event.preventDefault(); 
    }

    dismissErrorAlert (){
        this.setState({
            errorOccured: false,
            errorMessage: ''
        })
    }

    handleFile (event) {
        console.log(this.fileRef.current.files)
    }

    render () {

        const fileSucessStyle = this.state.fileUploaded ? {} : { display : 'none'} ;

        const fileErrorStyle = this.state.errorOccured ? {} : {display: 'none'};

        const formStyle = !this.state.fileUploaded ? {} : {display: 'none'};

        const buttonText = this.state.isSubmitting ? 'Uploading..' : 'Upload';

        const spinnerStyle = this.state.isSubmitting ? {} : {display : 'none'};

        return (
            <div>
                <Jumbotron className='customJumbotron'>
                    <div id='fileForm' style={formStyle}>
                        <h1>Upload Your Twitter Archive</h1>
                        <p>Setting up your Twitter Memories Account is very easy ! Just follow these 3 steps below:</p>
                        <ol>
                            <li>Download your Twitter Archive using this guide <a target="_blank" href='https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive'>here.</a></li>
                            <li>Find the file "tweet.js" within the "data" folder of your Twitter Archive.</li>
                            <li>Upload the tweet.js file onto Twitter Memories below so we can process your tweets !</li>
                        </ol>
                        <Form onSubmit={this.uploadFile}>
                            <Form.Group className="uploadButton"    >
                                <Form.File id="formControlFile" ref={this.fileRef} onChange={this.handleFile}/>
                            </Form.Group>
                        
                            <Button variant="primary" type="submit" ref={this.buttonRef} disabled={this.state.isSubmitting}>
                                {buttonText}
                                <Spinner style={spinnerStyle}
                                    as='span'
                                    animation='border' 
                                >
                                </Spinner>
                            </Button>
                        </Form>
                    </div>
            
                    <div id="fileUploaded" style={fileSucessStyle}>
                        <h1>Your file is currently being processed, please come back later to see your tweets.</h1>
                    </div>

                    <div id="errorOccured" style={fileErrorStyle}>
                        <Alert variant='danger' dismissible='true' onClose={this.dismissErrorAlert}>{this.state.errorMessage}</Alert>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

export default Upload;