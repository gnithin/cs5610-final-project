import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import loginService from '../services/loginAndRegistrationService'
import userAction from "../redux/actions/userProfileActions";
import utils from "../common/utils";
import Loader from "../components/loader";


const authenticatedComponent = (WrappedComponent) => {
    const AuthComponent = (props) => {
        if (utils.isNull(props.isLoggedIn)) {
            loginService.currentLoggedInService().then(response => {
                if (response.status === 1) {
                    props.setIsLogin(true, response.data);
                } else {
                    props.setIsLogin(false, {});
                }
            });
            return (<Loader/>)
        }

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

export default authenticatedComponent;
