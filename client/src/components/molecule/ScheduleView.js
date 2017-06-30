import React from 'react';
import RallyObject from '../atom/RallyObject';
import Loading from '../atom/Loading';
import API from '../../Utilities/API';
import ObjectMap from '../../Utilities/Objects';

export default class ScheduleView extends React.Component {

    constructor(props){
        super(props);
        const initialState = {};
        if(props.item){
            const parentId = props.item.FormattedID;
            const childType = ObjectMap[props.item._type.toLowerCase()].childType;
            if(childType){
                // initialState.loadingChildren = true;
                // this.findChildren(parentId, childType);
                initialState.parentId = parentId;
                initialState.childType = childType;
                initialState.childObject = ObjectMap[childType.toLowerCase()];
            }
        }
        this.state = initialState;

        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveChildUp = this.moveChildUp.bind(this);
        this.moveChildDown = this.moveChildDown.bind(this);
    }

    findChildren(parentId, childType){
        const state = Object.assign(this.state, {loadingChildren: true});
        this.setState(state);
        API.objectChildren(parentId, childType).then((res) => {
            if(res.ok){
                res.json().then((json) => {
                    this.setState({
                        children: json,
                        loadingChildren:false
                    });
                });
            } else {
                this.setState({
                    loadingChildren: false,
                    children: undefined
                });
            }
        });
    }

    moveUp(){
        if(this.props.moveUp){
            this.props.moveUp(this.props.index);
        }
    }

    moveDown(){
        if(this.props.moveDown){
            this.props.moveDown(this.props.index);
        }
    }

    moveChildUp(index){
        if(index > 0){
            let children = this.state.children.slice();
            let removed = children.splice(index - 1, 1)[0];
            children.splice(index, 0, removed);
            let state = Object.assign(this.state, {children: children});
            this.setState(state);
        }
    }

    moveChildDown(index){
        if(index < this.state.children.length - 1){
            let children = this.state.children.slice();
            let removed = children.splice(index, 1)[0];
            children.splice(index + 1, 0, removed);
            let state = Object.assign(this.state, {children: children});
            this.setState(state);
        }
    }

    render() {

        let order;

        if(!isNaN(this.props.index)){
            order = <p>
                <button className="btn btn-default btn-sm" type="button" onClick={this.moveUp}>/\</button>
                {' ' + (this.props.index + 1) + ' '}
                <button className="btn btn-default btn-sm" type="button" onClick={this.moveDown}>\/</button>
            </p>
        }

        let children;
        
        if(this.state.loadingChildren){
            children =  <Loading width="100%"/>;
        } else {
            if(this.state.children && this.state.children.length > 0){
                children = this.state.children.map((item, index) => {
                    return <ScheduleView key={item._ref} item={item} width="4" index={index} moveUp={this.moveChildUp} moveDown={this.moveChildDown}/>
                });
            } else if(this.state.parentId && this.state.childType){
                children = <button className="btn btn-info" type="button" onClick={() => this.findChildren(this.state.parentId,this.state.childType)}>Find {this.state.childObject.label + 's'}</button>
            }
        }

        let childrenHolder;
        if(children){
            childrenHolder = <div className="well col-xs-12">
                                {children}
                            </div>
        }

        return (
            <div className={'col-xs-' + (this.props.width && !(this.state.children && this.state.children.length > 0) ? this.props.width : '12')}>
                <div className="panel panel-default">
                    <div className="panel-body">
                        {order}
                        <RallyObject item={this.props.item} />
                        {childrenHolder}
                    </div>
                </div>
            </div>
        );
    }
}