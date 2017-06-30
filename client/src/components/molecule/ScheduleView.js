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

        // this.moveUp = this.moveUp.bind(this);
        // this.moveDown = this.moveDown.bind(this);
        // this.moveChildUp = this.moveChildUp.bind(this);
        // this.moveChildDown = this.moveChildDown.bind(this);
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
            this.setState({children: children});
        }
    }

    moveChildDown(index){
        if(index < this.state.children.length - 1){
            let children = this.state.children.slice();
            let removed = children.splice(index, 1)[0];
            children.splice(index + 1, 0, removed);
            this.setState({children: children});
        }
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
                            {children ? children : 'Nothing to see here'}
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
                            <div className="input-group">
                                <span className="input-group-btn">
                                    <button type="button" className="btn btn-default" onClick={this.createGroup}>Create Group</button>
                                </span>
                                <input type="text" className="form-control" value={this.state.newGroupName} onChange={this.setNewGroupName} placeholder="Group Name..." />
                            </div>
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