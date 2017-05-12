import React from 'react';
import Navbar from '../molecule/Navbar.js';
import API from '../../Utilities/API.js';
import SearchField from '../atom/SearchField';

const objectTypes = [
    {
        type: 'portfolioitem/initiative',
        label: 'Initiative'
    },
    {
        type: 'portfolioitem/epic',
        label: 'Epic'
    },
    {
        type: 'portfolioitem/feature',
        label: 'Feature'
    },
    {
        type: 'hierarchicalrequirement',
        label: 'Story'
    },
    {
        type: 'task',
        label: 'Task'
    }
];

export default class Main extends React.Component {

    constructor(){
        super();

        this.state = {};
    }

    query(obj){
        this.setState({
            loading: true
        });
        API.object(obj.type.type, obj.value).then((res) => {
            if(res.ok){
                res.json().then((json) => {
                    console.log(json);
                    this.setState({
                        queryResult: json,
                        loading:false
                    });
                });
            } else {
                res.text().then((text) => {
                    console.log(text);
                });
                this.setState({
                    queryResult: undefined,
                    loading:false
                });
            }
        });
    }

    getChildren(obj){
        this.setState({
            loading: true
        });
        API.initiativeChildren(obj.FormattedID).then((res) => {
            if(res.ok){
                res.json().then((json) => {
                    console.log(json);
                    this.setState({
                        queryResult: json,
                        loading:false
                    });
                });
            } else {
                res.text().then((text) => {
                    console.log(text);
                });
                this.setState({
                    queryResult: undefined,
                    loading:false
                });
            }
        });
    }

    render() {
        var loadingBar = this.state.loading ? (
            <div className="progress">
                <div className="progress-bar progress-bar-striped active" style={{width:'100%'}}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        ) : undefined;

        var results;
        if(this.state.queryResult && ! this.state.loading){
            results = this.state.queryResult.map((obj, index) => {
                return (
                    <div key={obj._ref}>
                        {obj.FormattedID}: {obj.Name} ({obj._type})
                        <button onClick={()=> this.getChildren(obj)} className="btn btn-info">
                            Find Children
                        </button>
                    </div>
                )
            });
        }
        
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="col-xs-3 push-xs-1">
                        <SearchField options={objectTypes} default={objectTypes[0]} onSearch={(obj) => this.query(obj)}/>
                    </div>
                </div>
                {loadingBar}
                {results}
            </div>  
        );
    }
}

