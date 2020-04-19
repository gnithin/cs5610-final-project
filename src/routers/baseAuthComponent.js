import React from 'react';
import utils from "../common/utils";
import loginService from "../services/loginAndRegistrationService";
import Loader from "../components/loader";
import userAction from "../redux/actions/userProfileActions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const baseAuthComponent = (WrappedComponent, redirectLoggedIn, redirectUrl) => {
    const AuthComponent = (props) => {
        // When there is no state at all
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

        if (redirectLoggedIn) {
            // Redirect only if the user is logged-in
            if (props.isLoggedIn) {
                return (
                    <Redirect to={{
                        pathname: redirectUrl,
                    }}/>
                );
            }

        } else {
            // Redirect only if the user is not logged-in
            if (false === props.isLoggedIn) {
                return (
                    <Redirect to={{
                        pathname: redirectUrl,
                    }}/>
                );
            }
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

    return connect(reduxToComponentMapper, dispatchMapper)(AuthComponent);
};

export default baseAuthComponent;
