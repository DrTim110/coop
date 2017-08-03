import React from 'react';
import Navbar from '../molecule/Navbar.js';
import API from '../../Utilities/API.js';
import SearchField from '../atom/SearchField';
import {ObjectsArray} from '../../Utilities/Objects.js';
import ScheduleView from '../molecule/ScheduleView';
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
        API.objectChildren(obj.FormattedID, obj.Children._type).then((res) => {
            if(res.ok){
                res.json().then((json) => {
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

    renderForChildren(obj){
        if(obj.DirectChildrenCount > 0 || true){
            return (
                <button onClick={()=> this.getChildren(obj)} className="btn btn-info">
                    Find Children
                </button>
            );
        }
    }

    render() {
        var loadingBar = this.state.loading ? (
            <div className="col-xs-12">
                <div className="progress">
                    <div className="progress-bar progress-bar-striped active" style={{width:'100%'}}>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        ) : undefined;

        var results;
        if(this.state.queryResult && ! this.state.loading){
            results = this.state.queryResult.map((obj, index) => {
                return (
                    <ScheduleView key={obj._ref} item={obj} width="12"/>
                )
            });
        }
        
        return (
            <div>
                <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-3 push-xs-1">
                            <SearchField options={ObjectsArray} default={ObjectsArray[0]} onSearch={(obj) => this.query(obj)}/>
                        </div>
                    </div>
                    <br>
                    </br>
                    <div className="row">
                        {loadingBar}
                    </div>
                    <div className="row">
                        {results}
                    </div>
                </div>
            </div>  
        );
    }
}

