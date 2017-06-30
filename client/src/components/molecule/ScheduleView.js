import React from 'react';
import RallyObject from '../atom/RallyObject';
import Loading from '../atom/Loading';
import API from '../../Utilities/API';
import ObjectMap from '../../Utilities/Objects';

export default class ScheduleView extends React.Component {

    constructor(props){
        super(props);
        const initialState = {
            newGroupName: ''
        };
        if(props.item){
            const parentId = props.item.FormattedID;
            const childType = ObjectMap[props.item._type.toLowerCase()].childType;
            if(childType){
                // initialState.loadingChildren = true;
                // this.findChildren(parentId, childType);
                initialState.parentId = parentId;
                initialState.childType = childType;
                initialState.childObject = ObjectMap[childType.toLowerCase()];
                initialState.groups = [];
            }
        }
        this.state = initialState;

        this.setNewGroupName = this.setNewGroupName.bind(this);
        this.createGroup = this.createGroup.bind(this);
        // this.moveChild = this.moveChild.bind(this);
    }

    findChildren(parentId, childType){
        this.setState({loadingChildren: true});
        API.objectChildren(parentId, childType).then((res) => {
            if(res.ok){
                res.json().then((json) => {
                    this.groupChildren(json);
                });
            } else {
                this.setState({
                    loadingChildren: false,
                    children: undefined
                });
            }
        });
    }

    groupChildren(children){
        let groups = this.state.groups.splice();
        groups.push({
            label: 'Unassigned',
            children: children
        });
        this.setState({
            groups: groups,
            loadingChildren: false
        });
    }

    setNewGroupName(event){
        this.setState({
            newGroupName: event.target.value
        });
    }

    createGroup(){
        if(this.state.newGroupName.length > 0){
            let groups = this.state.groups.slice();
            groups.unshift({
                label: this.state.newGroupName,
                children: []
            });
            this.setState({
                newGroupName: '',
                groups: groups
            });
        }
    }

    renderChildren(){
        if(this.state.groups){
            if(this.state.groups.length > 0){
                return this.state.groups.map((group, groupIndex) => {
                    let children = group.children.map((child, childIndex) => {
                        return <ScheduleView key={child._ref} item={child} width="4"/>
                    });
                    if(this.state.groups.length > 1){
                        return <div className="well col-xs-12" key={group.label}>
                            <h4 className="text-center">{group.label}</h4>
                            {children.length > 0 ? children : <h6 className="text-center">Nothing to see here</h6>}
                        </div>;
                    }
                    return children;
                });
            }
        }

        return <button className="btn btn-info" type="button" onClick={() => this.findChildren(this.state.parentId,this.state.childType)}>Find {this.state.childObject.labelPlural}</button>
    }

    render() {

        let order;

        if(!isNaN(this.props.index)){
            order = <p className="pull-right">
                        <button className="btn btn-default btn-sm" type="button" onClick={this.moveUp}>/\</button>
                        {' ' + (this.props.index + 1) + ' '}
                        <button className="btn btn-default btn-sm" type="button" onClick={this.moveDown}>\/</button>
                    </p>
        }

        let controls;
        if(this.state.groups && this.state.groups.length > 0){
            controls =  <div className="">
                            <form action="" className="input-group" onSubmit={this.createGroup}>
                                <span className="input-group-btn">
                                    <button type="submit" className="btn btn-default">Create Group</button>
                                </span>
                                <input type="text" className="form-control" value={this.state.newGroupName} onChange={this.setNewGroupName} placeholder="Group Name..." />
                            </form>
                            {order}
                        </div>
        }

        let loading;
        if(this.state.loadingChildren){
            loading =  <Loading width="100%"/>;
        }

        return (
            <div className={'col-xs-' + (this.props.width && !(this.state.groups && this.state.groups.length > 0) ? this.props.width : '12')}>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <RallyObject item={this.props.item} />
                        {loading}
                        {controls}
                        {this.renderChildren()}
                    </div>
                </div>
            </div>
        );
    }
}