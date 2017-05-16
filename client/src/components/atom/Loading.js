import React from 'react';

/**
 * `Loading` displayes a loading bar, of the width passed in.
 * props:{
 *  width: {String} The css width of the loading bar
 * }
 */
export default function Loading(props){
    props = props || {};
    let width = props.width || '100%'

    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped active" style={{width:width}}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}