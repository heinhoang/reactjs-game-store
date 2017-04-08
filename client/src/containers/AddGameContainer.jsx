import React, { Component } from 'react';
import BrowserHistory from 'react-router';
import Form from '../components/Form';

export default class AddGameContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { newGame: {} };
        this.formToState = this.formToState.bind(this);
        this.uploadPicture = this.uploadPicture.bind(this);
        this.submit = this.submit.bind(this);
    }

    formToState() {
        const formData = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            year: document.getElementById('year').value,
            picture: $('#picture').attr('src')
        };
        this.setState({ newGame: formData });
        console.log(this.state);
    }

    uploadPicture() {
        filepicker.pick(
            {
                mimetype: 'image/*', // Cannot upload other files but images
                container: 'window',
                services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
                openTo: 'COMPUTER' // First choice to upload files from
            },
            function(Blob) {
                console.log(JSON.stringify(Blob));
                $('#picture').attr('src', Blob.url);
            },
            function(FBError) {
                console.log(FBError.toString());
            }
        );
    }

    submit() {
        const newGame = Object.assign({}, { picture: $('#picture').attr('src') }, this.state.newGame);
        fetch('/api/games', {
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            method: 'POST',
            body: JSON.stringify(newGame)
        })
            .then(res => res.json)
            .then(data => {
                console.log(data.message);
                BrowserHistory.push('/games');
            });
    }

    render() {
        return <Form submit={this.submit} formToState={this.formToState} uploadPicture={this.uploadPicture} />;
    }
} 