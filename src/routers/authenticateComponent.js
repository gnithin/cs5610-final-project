import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";


const authenticateComponent = (WrappedComponent) => {
    const AuthComponent = (props) => {
        // TODO: Add logic to check for login here, and remove this constant
        const IS_LOGGED_IN = true;

        if (false === IS_LOGGED_IN) {
            return (
                <Redirect to={{
                    pathname: '/login',
                }}/>
            );
        }

        return (
            <WrappedComponent {...props}/>
        );
    };

    // TODO: Add redux state
    const reduxToComponentMapper = (state) => {
        return {};
    };

    // Whatever redux connection needs to be done can be added here.
    return connect(reduxToComponentMapper)(AuthComponent);
};

export default authenticateComponent;
