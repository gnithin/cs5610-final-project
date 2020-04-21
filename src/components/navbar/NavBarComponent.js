import React, {Component} from 'react';
import './navBarStyle.css'
import {Link, withRouter} from "react-router-dom";
import loginService from '../../services/loginAndRegistrationService'
import {connect} from "react-redux";
import userProfileActions from "../../redux/actions/userProfileActions";
import Utils from "../../common/utils";

class NavBarComponent extends Component {

    logout = () => {
        loginService.logoutService().then(response => {
            if (response.status !== 1) {
                throw new Error("Logout was unsuccessful!");
            }

            this.props.resetLoginState();
            this.props.history.push('/welcome');
        }).catch(e => {
            console.log("Error logging out of the system! - ", e);
        });
    };

    render() {
        let chowkPath = "/welcome";
        if (true === this.props.isLoggedIn) {
            chowkPath = "/home";
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="navbar-brand chowk-logo">
                    <Link
                        title="Chowk"
                        to={chowkPath}
                        className="chowk-logo-link"
                    >
                        Chowk
                    </Link>
                    {this.renderProfile()}
                    {this.renderAdminDashboard()}
                </div>

                <div className="navbar-nav ml-auto nav-right">
                    {
                        this.props.isLoggedIn
                        &&
                        <Link
                            className="btn btn-primary ml-3"
                            title="Search questions"
                            to={`/search`}
                        >
                            <i className="fa fa-search" aria-hidden="true"/> &nbsp;
                            Search Questions
                        </Link>
                    }
                </div>

                <div className="navbar-nav nav-right my-2 my-lg-0">
                    {
                        this.props.isLoggedIn
                        &&
                        <Link
                            className="btn btn-primary ml-3"
                            title="Create Question"
                            to={`/create/questions`}
                        >
                            <i className="fa fa-plus" aria-hidden="true"/> &nbsp;
                            New Question
                        </Link>
                    }
                    {
                        !this.props.isLoggedIn
                        &&
                        <Link className={"btn btn-success ml-2"} to={"/login"}>Login</Link>
                    }
                </div>

                <div className="navbar-nav nav-right my-2 my-lg-0">
                    {
                        this.props.isLoggedIn
                        &&
                        <button
                            className="btn btn-danger ml-3"
                            onClick={this.logout}
                        >
                            Logout
                        </button>
                    }
                    {
                        !this.props.isLoggedIn
                        &&
                        <Link className={"btn btn-primary ml-2"} to={"/register"}>Register</Link>
                    }
                </div>
            </nav>
        );
    }

    renderProfile() {
        let isLoggedIn = this.props.isLoggedIn;
        if (Utils.isNull(isLoggedIn) || false === isLoggedIn) {
            return (<React.Fragment/>);
        }

        let user = this.props.userDetails;

        return (
            <Link
                className="profile-username"
                title="Profile"
                to={`/profiles/${user.id}`}
            >
                <span>
                    {user.name}'s Profile
                </span>
            </Link>
        );
    }

    renderAdminDashboard() {
        let isLoggedIn = this.props.isLoggedIn;
        if (Utils.isNull(isLoggedIn) || false === isLoggedIn) {
            return (<React.Fragment/>);
        }

        let user = this.props.userDetails;
        if (
            false === (
                false === Utils.isNull(user) &&
                user.isAdmin === true
            )
        ) {
            return (<React.Fragment/>);
        }

        return (
            <Link
                className="profile-admin-dashboard btn btn-primary"
                title="Profile"
                to={`/admin/users`}
            >
                <span>
                    Admin Dashboard
                </span>
            </Link>
        );

    }
}

const stateMapper = (state) => {
    return {
        userDetails: state.userProfile.userDetails,
        isAdmin: state.userProfile.isAdmin,
        isLoggedIn: state.userProfile.isLoggedIn
    }

};

const dispatchMapper = (dispatch) => {
    return {
        resetLoginState: () => {
            dispatch(userProfileActions.resetLoginStatus());
        }
    }

};
export default withRouter(connect(stateMapper, dispatchMapper)(NavBarComponent));
