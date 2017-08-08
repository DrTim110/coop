import React, {Component} from 'react';
import API from '../../Utilities/API.js';

class EpicStoryView extends Component {

    constructor(){
        super();

        this.state = {
            isSearching: false,
            userStories: []
        };

        
    }

    componentDidMount(){
        this.findStories(); 
    }

    findStories(){        
        this.setState({
            isSearching: true
        });
        let localThis = this;
        API.getEpicUserStories(this.props.epic.FormattedID).then(function(res){
            return res.json();
        }).then(function(json){
            console.log(json);
            localThis.setState({
                isSearching: false,
                userStories: json
            });
        }).catch(function(err){
            console.log('err');
            console.log(err);
        });
    }

    render(){
        let loading;
        if(this.state.isSearching){
            loading = <p>Loading...</p>
        }

        let stories = this.state.userStories.map((value, index) => {
            return <div className="well well-sm" key={value._ref}>
                <h4> {value.FormattedID} : {value.Name} [{value.ScheduleState}]</h4>
                <p>Owner: {value.Owner._refObjectName}</p>
                <p>Feature: {value.Feature.FormattedID} - {value.Feature.Name}</p>
                <p>Project: {value.Project.Name}</p>
                <p>Iteration: {value.Iteration ? value.Iteration.Name : 'unknown'}</p>
            </div>
        });

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <h3>{this.props.epic.FormattedID} : {this.props.epic.Name}</h3>
                    <a href={"/api/object/" + this.props.epic.FormattedID + '-not_accepted.csv'}  download>CSV</a>
                    {loading}
                    {stories}
                </div>
            </div>
        );
    }
}

export default EpicStoryView;