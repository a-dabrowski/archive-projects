import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as api from './api.js';

window.zeppelin = api;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
