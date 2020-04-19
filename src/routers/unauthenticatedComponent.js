import React from 'react';
import utils from "../common/utils";
import loginService from "../services/loginAndRegistrationService";
import Loader from "../components/loader";
import userAction from "../redux/actions/userProfileActions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const unauthenticatedComponent = (WrappedComponent) => {
    const UnAuthComponent = (props) => {
        if (utils.isNull(props.isLoggedIn)) {
            // Make the login call
            loginService.currentLoggedInService().then(response => {
                if (response.status === 1) {
                    props.setIsLogin(true, response.data);
                } else {
                    props.setIsLogin(false, {});
                }
            });
            return (<Loader/>)
        }

        if (props.isLoggedIn) {
            return (
                <Redirect to={{
                    pathname: '/home',
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
    return connect(reduxToComponentMapper, dispatchMapper)(UnAuthComponent);
};

export default unauthenticatedComponent;
