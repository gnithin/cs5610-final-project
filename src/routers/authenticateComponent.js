import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import loginService from '../services/loginAndRegistrationService'
import userAction from "../redux/actions/userProfileActions";
import utils from "../common/utils";


const authenticateComponent = (WrappedComponent) => {
    const AuthComponent = (props) => {
        // TODO: Add logic to check for login here, and remove this constant

        if (utils.isNull(props.isLoggedIn)) {
            loginService.currentLoggedInService().then(response => {
                if (response.status === 1) {
                    props.setIsLogin(true, response.data);
                } else {
                    props.setIsLogin(false, {});
                }
            });
            return (<div>loading</div>)
        }
        // const IS_LOGGED_IN = props.isLoggedIn;

        if (false === props.isLoggedIn) {
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
        return {
            isLoggedIn: state.userProfile.isLoggedIn
        };
    };

    const dispatchMapper = (dispatch) => {
        return {
            setIsLogin: (loginStatus, userData) => {
                dispatch(userAction.setIsLogin(loginStatus, userData))
            }
        }
    };

    // Whatever redux connection needs to be done can be added here.
    return connect(reduxToComponentMapper, dispatchMapper)(AuthComponent);
};

export default authenticateComponent;
