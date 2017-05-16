import React from 'react';
import API from '../../Utilities/API.js';
/**
 * `Navbar` is a navigation bar at the top of the screen, displaying the title of the application
 * (Coop), and a users first and last name after login.
 */
export default class Navbar extends React.Component {

    /**
     * Retrieve the user at construction time from the API
     */
    constructor(){
        super();
        this.state = {};
        API.getUser().then((res) => this.handleUser(res));
    }

    /**
     * Grab the fields we care about from the user json, and add them to the state
     */
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