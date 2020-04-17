import React from 'react';
import Utils from "../../common/utils";
import './loading.css'

const LoadingComponent = ({message}) => {
    if (Utils.isEmptyStr(message)) {
        message = "Loading Chowk..."
    }

    return (
        <div className="loading-wrapper">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="loading-content">
                {message}
            </div>
        </div>
    );
};

export default LoadingComponent;
