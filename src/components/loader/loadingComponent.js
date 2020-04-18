import React from 'react';
import Utils from "../../common/utils";
import './loading.css'

const LoadingComponent = ({message, wrapperClass, loadingClass}) => {
    if (Utils.isEmptyStr(message)) {
        message = "Loading Chowk..."
    }

    if (Utils.isEmptyStr(wrapperClass)) {
        wrapperClass = "loading-wrapper";
    }

    if (Utils.isEmptyStr(loadingClass)) {
        loadingClass = "loading-content";
    }


    return (
        <div className={wrapperClass}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className={loadingClass}>
                {message}...
            </div>
        </div>
    );
};

export default LoadingComponent;
