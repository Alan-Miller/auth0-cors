import React from 'react';
import './Login.css';

export default function Login(props) {

    return (
        <a href={process.env.REACT_APP_LOGIN} className="button">Authenticate</a>
    )
}
