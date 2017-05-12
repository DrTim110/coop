import React from 'react';

export default class Login extends React.Component {

    login(){
        window.location.href = '/api/login';
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={() => this.login()}>Login with CA</button>
            </div>
        );
    }    
}