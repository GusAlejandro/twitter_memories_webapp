import React from 'react';
import './Upload.css';
import { Form, Alert, Button } from 'react-bootstrap';
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
            isSubmitting: false
        }
    };

    uploadFile (event) {
        console.log("the uplaod button was clicked")
        this.setState({
            isSubmitting: true
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
            // add in logic for succesful upload and errors
            this.setState({
                isSubmitting: false
            })
        }).catch((error) => {
            this.setState({
                isSubmitting: false 
            })
        })

        event.preventDefault(); 
    }

    dismissErrorAlert (){
        this.setState({
            errorOccured: false
        })
    }

    handleFile (event) {
        console.log(this.fileRef.current.files)
    }

    render () {

        const fileSucessStyle = this.state.fileUploaded ? {} : { display : 'none'} ;

        const fileErrorStyle = this.state.errorOccured ? {} : {display: 'none'};

        const formStyle = !this.state.fileUploaded ? {} : {display: 'none'};

        return (
            <div>
                <div id='fileForm' style={formStyle}>
                    <h1>Please Upload File</h1>
                    <Form onSubmit={this.uploadFile}>
                        <Form.Group>
                            <Form.File id="formControlFile" label="Twitter Archive File" ref={this.fileRef} onChange={this.handleFile}/>
                        </Form.Group>
                    
                        <Button variant="primary" type="submit" ref={this.buttonRef} disabled={this.isSubmitting}>
                            Upload
                        </Button>
                    </Form>
                </div>
        
                <div id="fileUploaded" style={fileSucessStyle}>
                    <h1>Your file is currently being processed, please come back later to see your tweets.</h1>
                </div>

                <div id="errorOccured" style={fileErrorStyle}>
                    <Alert variant='danger' dismissible='true' onClose={this.dismissErrorAlert}>An error occured during file upload, try again.</Alert>
                </div>
            </div>
        );
    }
}

export default Upload;