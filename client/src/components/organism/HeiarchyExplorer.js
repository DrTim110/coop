import React from 'react';
import RallyObject from '../atom/RallyObject';
import Loading from '../atom/Loading';
import API from '../../Utilities/API';
import ObjectMap from '../../Utilities/Objects';

export default class HeiarchyExplorer extends React.Component {


    constructor(props){
        super(props);
        const initialState = {};
        if(props.item){
            const parentId = props.item.FormattedID;
            const childType = ObjectMap[props.item._type.toLowerCase()].childType;
            if(childType){
                initialState.loadingChildren = true;
                this.findChildren(parentId, childType);
            }
        }
        this.state = initialState;
    }

    findChildren(parentId, childType){
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

    render() {

        let children;
        if(this.state.loadingChildren){
            children =  <Loading width="100%"/>;
        } else {
            if(this.state.children && this.state.children.length > 0){
                children = this.state.children.map((item, index) => {
                    return <HeiarchyExplorer key={item._ref} item={item} />
                });
            }
        }

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <RallyObject item={this.props.item} />
                    {children}
                </div>
            </div>
        );
    }
}