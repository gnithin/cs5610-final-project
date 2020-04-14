import React, {Component} from 'react';
import './navBarStyle.css'
import {Link} from "react-router-dom";
import loginService from '../../services/loginAndRegistrationService'
import {connect} from "react-redux";
import userProfileActions from "../../redux/actions/userProfileActions";

class NavBarComponent extends Component {

    logout = () => {
        loginService.logoutService().then(response => {
            if (response.status === 1) {
                this.props.resetLoginState();
            }
        });
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="navbar-brand titleStyle">
                    <Link
                        title="Chowk"
                        to={`/home`}
                    >
                        Chowk
                    </Link>
                    {
                        this.props.isLoggedIn
                        &&
                        <Link
                            className={"ml-5"}
                            title="Profile"
                            to={`/profile/${this.props.userDetails.id}`}
                        >
                            Profile
                        </Link>
                    }
                </div>

                <div className="navbar-nav ml-auto nav-right my-2 my-lg-0">
                    {
                        this.props.isLoggedIn
                        &&
                        <Link
                            className="btn btn-primary ml-3"
                            title="Create Question"
                            to={`/create/question`}
                        >
                            Create Question
                        </Link>
                    }


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
                </div>
            </nav>
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
export default connect(stateMapper, dispatchMapper)(NavBarComponent);
