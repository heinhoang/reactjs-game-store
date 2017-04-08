import css from '../dist/css/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

// Will use filestack.com to upload pictures
filepicker.setKey("A5VehwbQaSlW2F0Sxzaz4z");

ReactDOM.render(
    Routes,
    document.getElementById('content')
)