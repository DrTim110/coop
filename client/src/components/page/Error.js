import React from 'react';

/**
 * An error has occurred.
 */
export default class Error extends React.Component {

    render() {
        return (
            <div class="alert alert-danger">
                Something Happened!
            </div>
        );
    }
}