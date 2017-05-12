import React from 'react';
import API from '../../Utilities/API.js';

export default class Navbar extends React.Component {

    constructor(){
        super();
        this.state = {};
        API.getUser().then((res) => this.handleUser(res));
    }

    handleUser(res){
        res.json().then((json) => {
            this.setState({
                name: json.FirstName + ' ' + json.LastName
            });
        });
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand">Coop</a>
                        <p className="navbar-text">{this.state.name}</p>
                    </div>
                </div>
            </nav>
        );
    }
}