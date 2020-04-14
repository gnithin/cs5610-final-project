import React, {Component} from 'react';
import './navBarStyle.css'
import {Link, Redirect} from "react-router-dom";
import loginService from '../../services/loginAndRegistrationService'
import {connect} from "react-redux";

class NavBarComponent extends Component {

    state = {
        redirectURL: ""
    };

    logout = () => {
        loginService.logoutService().then(response => {
            if(response.status === 1) {
                this.props.resetLoginState();
                this.setState({
                    redirectURL: "/login"
                });
            }
        });
    };

    render() {
        return (
            <span>
                {
                    this.state.redirectURL !== ""
                    &&
                    <Redirect to={this.state.redirectURL}/>
                }
                {
                    this.state.redirectURL === ""
                    &&
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="navbar-brand titleStyle">
                            <Link
                                title="Chowk"
                                to={`/home`}
                            >
                                Chowk
                            </Link>
                            <Link
                                className={"ml-5"}
                                title="Profile"
                                to={`/profile/:userId`}
                            >
                                Profile
                            </Link>
                        </div>

                        <div className="navbar-nav ml-auto nav-right my-2 my-lg-0">
                            <Link
                                className="btn btn-primary ml-3"
                                title="Create Question"
                                to={`/create/question`}
                            >
                                Create Question
                            </Link>


                            <button
                                className="btn btn-danger ml-3"
                                onClick={this.logout}
                            >
                                Logout
                            </button>
                        </div>
                    </nav>
                }
            </span>
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
            dispatch();
        }
    }

};
export default connect(stateMapper, dispatchMapper)(NavBarComponent);
