import React from 'react';
import ObjectsMap from '../../Utilities/Objects';


export default class RallyObject extends React.Component {

    render(){
        const rallyObject = ObjectsMap[this.props.item._type.toLowerCase()];

        return (
            <div>
                <h3>
                    <span className={'label label-' + rallyObject.color}>{rallyObject.label}</span> {this.props.item.FormattedID}
                </h3>
                {this.props.item.Name}
            </div>
        );
    }
}