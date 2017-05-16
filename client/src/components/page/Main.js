import React from 'react';
import Navbar from '../molecule/Navbar.js';
import ACExpandingObject from '../molecule/ACExpandingObject.js';
import API from '../../Utilities/API.js';
import SearchField from '../atom/SearchField';

/**
 * Type of Agile Central objects available
 */
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
/**
 * `Main` is the main page after being logged in
 */
export default class Main extends React.Component {

    constructor(){
        super();

        this.state = {};
    }

    query(obj)
    {
        this.setState({
            query:obj
        })
    }

    /**
     * Query api for an object.
     */
    _query(obj){
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

    /**
     * Find this objects children.
     */
    getChildren(obj){
        this.setState({
            loading: true
        });
        API.objectFromRef(obj.Children._ref).then((res) => {
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

    /**
     * Display loading bar, or found object.
     */
    render() {
        var loadingBar = this.state.loading ? (
            <div className="progress">
                <div className="progress-bar progress-bar-striped active" style={{width:'100%'}}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        ) : undefined;

        var results;
        if(this.state.query)
        {
            console.log(this.state.query);
            results =(
                    <ACExpandingObject type={this.state.query.type.type} formattedId={this.state.query.value} />
                );
        
        }
        // if(this.state.queryResult && ! this.state.loading){
        //     results = this.state.queryResult.map((obj, index) => {
        //         return(
        //             <ACExpandingObject key={obj._ref} objectRef={obj._ref} />
        //         )
        //     });
        // }
        
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

