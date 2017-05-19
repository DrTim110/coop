import React from 'react';
import ReactGridLayout from 'react-grid-layout';

/**
 * `ACExpandingObject` is meant to start with a root object, and then
 * be able to add its children visually.
 */
export default class ACRearrangmentView extends React.Component {

 constructor(props){
    super(props);
    let state = Object.assign({}, props);

    if(!state.tree)
    {
        state.tree = [
            {
                name:'I482',
                title:'PR90895 - IM Appointment Setting',
                description:'',
                type:'Initiative',
                children:[
                    {
                        name:'E1042',
                        title:'Appointment Setting Feedback',
                        description:'This epic covers the work to build out the Appointment Setting Feedback analytics',
                        type:'Epic',
                        children:[
                            {
                                name:'F3859',
                                title:'IM Appointment Setting Feedback - Inception',
                                description:'This covers the detailed Assessment and Inception documents required for SBI.',
                                type:'Feature',
                                children:[
                                    {
                                        name:'US20647',
                                        title:'IM Appointment Setting-Inception Packet (Team1)',
                                        description:'As a Product Owner\nI need an inception packet put together\nso I know what my features are, who the team is, and what is in scope.',
                                        type:'Story',
                                        children:[],
                                    },
                                    {
                                        name:'US20646',
                                        title:'IM Appointment Setting Feedback-Initial Analysis (Team1)',
                                        description:'As an SA I need to understand the operational work flow and development plans in order to start the assessment.',
                                        type:'Story',
                                        children:[],
                                    },
                                    {
                                        name:'US15196',
                                        title:'IM Appointment Setting Feedback- Initial Analysis (Team2)',
                                        description:'As an SA I need to understand the operational work flow and development plans in order to start the assessment.',
                                        type:'Story',
                                        children:[],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name:'E1178',
                        title:'IM Appointment Setting Tool/UI',
                        description:'Part of the IM Dispatch and Appointment Setting Project',
                        type:'Epic',
                        children:[
                            {
                                name:'F4484',
                                title:'eMail Customer Appointment Information',
                                description:'',
                                type:'Feature',
                                children:[],
                            },
                            {
                                name:'F4485',
                                title:'Display Order and Stops (Pickups and Deliveries) needing Appointments',
                                description:'',
                                type:'Feature',
                                children:[],
                            },
                            {
                                name:'F4486',
                                title:'Ability to Search for Orders needing Appointments',
                                description:'',
                                type:'Feature',
                                children:[],
                            },
                        ],
                    },
                    {
                        name:'E1180',
                        title:'Recommend Appointment',
                        description:'Part of the IM Dispatch and Appointment Setting Project',
                        type:'Epic',
                        children:[
                            {
                                name:'F4501',
                                title:'Use Customer History as input into Appointment Model',
                                description:'Appointment Model ',
                                type:'Feature',
                                children:[],
                            },
                            {
                                name:'F4502',
                                title:'Use Location/Ramp Open Hours in the Appt Model',
                                description:'',
                                type:'Feature',
                                children:[],
                            },
                            {
                                name:'F4503',
                                title:'Use Capability in the Appointment Model',
                                description:'',
                                type:'Feature',
                                children:[
                                    {
                                        name:'US21978',
                                        title:'IM PROJECT:: Central Engr ASO/CAP research overlap',
                                        description:'',
                                        type:'Story',
                                        children:[],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }
        ]
    }

    this.state = state;
 }

gridHtmlForObject(object, x, y) {
    object = object || {};
    x = x || 0;
    y = y || 0;

    let style={
        borderWidth:'3px',
        borderColor:'#000000',
        borderStyle:'solid',
    };

    let name = object.name || 'no-name';
    let title = object.title || '';
    let description = object.description || '';
    let type = object.type || 'no-type';

    let grid ={x:x * 2, y:y*2, w:2, h:2};

    let children = object.children || [];
    let childrenHTML = children.map((object, i)=>{
        return this.gridHtmlForObject(object, i, y+1);
    });

    return [(<div data-grid={grid} key={name} style={style}>
        <h3>{name} - {title}</h3>
        <h4>{type}</h4>
        <div>{description}</div>
    </div>), childrenHTML];
}


 render() {

    let gridHTML = this.state.tree.map((object, i)=>{
        return this.gridHtmlForObject(object, i);
    });

    let style={
        borderWidth:'3px',
        borderColor:'#ff0000',
        borderStyle:'solid',
    }

    var props ={
        verticalCompact:false,
        cols:12,
        rowHeight:150,
        width:1200
    }

    return (
      <ReactGridLayout style={style} className="layout" {...props}>
        {gridHTML}
      </ReactGridLayout>
    );
  }
}