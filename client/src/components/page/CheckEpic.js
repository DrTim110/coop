import React, {Component} from 'react';
import API from '../../Utilities/API.js';
import EpicStoryView from '../molecule/EpicStoryView.js';
import Navbar from '../molecule/Navbar.js';

class CheckEpic extends Component {

    constructor(){
        super();

        this.state = {
            epicSearchValue: 'E1023',
            epicResults: []
        }
    }

    setEpicSearchValue(event){
        this.setState({
            epicSearchValue: event.target.value
        });
    }

    findEpic(event){
        event.preventDefault();
        let epicID = this.state.epicSearchValue.trim();
        let localThis = this;
        if(epicID.length > 0){
            API.object('portfolioitem/epic',epicID).then(function(searchResponse){
                return searchResponse.json();
            }).then(function(searchJson){
                localThis.setState({
                    epicResults: searchJson
                });
            }).catch(function(err){
                console.log('err');
                console.log(err);
            });
        }
        return false;
    }

    render(){

        let epics = this.state.epicResults.map((value, index) => {
            return (
                <EpicStoryView epic={value} key={value._ref} />
            );
        })

        return (
            <div>
                <Navbar />
                <div className="container">
                    <form className="form-inline row" action="" onSubmit={this.findEpic.bind(this)}>
                        <input type="text" className="form-control" defaultValue={this.state.epicSearchValue} onChange={this.setEpicSearchValue.bind(this)} placeholder="Epic ID..." />
                        <button className="btn btn-info" type="submit">Search</button>
                    </form>
                    <div className="row">
                        {epics}
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckEpic;