import React, { Component } from 'react';

class LoadingSpinner extends Component {
    render() {
        return (
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        );
    }
}

export default LoadingSpinner;