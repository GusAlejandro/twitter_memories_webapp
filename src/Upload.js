import React from 'react';
import './Upload.css';
import { Form, Alert } from 'react-bootstrap';
import axios from 'axios';

class Upload extends React.Component {

    constructor(props){
        super(props);
        
        this.fileRef = React.createRef();
        this.uploadFile = this.uploadFile.bind(this);
        this.dismissErrorAlert = this.dismissErrorAlert.bind(this);

        this.state = {
            fileUploaded : false,
            errorOccured : false
        }
    };

    uploadFile (event) {
        let formData = new FormData();
        const file = this.fileRef.files[0];
        formData.append('file', file)
        axios.post(
            'http://10.0.0.106:5000/upload', formData,
            { headers: {
                'Content-Type': 'multipart/form-data'
            }}
        ).then((response) => {
            // add in logic for succesful upload and errors
        })

        event.preventDefault(); 
    }

    dismissErrorAlert (){
        this.setState({
            errorOccured: false
        })
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
                            <Form.File id="formControlFile" label="Twitter Archive File" ref={this.fileRef}/>
                        </Form.Group>
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