import './bootstrap';
import '../css/app.css';
import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom/client';

const container = document.getElementById('hello-react');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));