import React from 'react';

export default function Loading(props){
    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped active" style={{width:props.width}}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}