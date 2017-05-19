import React from 'react';

/**
 * Link into Agile Central. Because of the SSO, need to log in manually first, 
 * then click the login button here.
 * 
 * TODO: Eventually fix it so that it is possible to log in without first logging in differently.
 */
export default class Login extends React.Component {

    /**
     * Call the login api
     */
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