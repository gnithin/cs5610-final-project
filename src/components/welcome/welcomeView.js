import React from 'react';
import './welcome.css'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Utils from "../../common/utils";

class WelcomeView extends React.Component {
    render() {
        return (
            <div className="wc-wrapper">
                <div className="wc-contents">
                    <div>
                        <h1 className="wc-header">Chowk</h1>
                        <span className="wc-tagline">Where questions come to die!</span>
                    </div>
                    {this.renderUserLinks()}
                    <div className="wc-privacy-links-wrapper">
                        <Link
                            target="_blank"
                            to={"/privacy-policy"}
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    renderUserLinks() {
        if (false === Utils.isNull(this.props.isLoggedIn) && true === this.props.isLoggedIn) {
            let name = this.props.userDetails.name;
            if (Utils.isNull(name)) {
                name = "";
            }

            return (
                <div className="wc-links-wrapper">
                    <span className="wc-user-message">Hi {name}!</span>
                    <Link to={"/home"}>
                        <button className="btn btn-primary wc-link">Return Home</button>
                    </Link>
                </div>
            );
        }

        return (
            <div className="wc-links-wrapper">
                <Link to={"/login"}>
                    <button className="btn btn-primary wc-link">Login</button>
                </Link>
                <Link to={"/register"}>
                    <button className="btn btn-primary wc-link">Register</button>
                </Link>
                <Link to={"/home"}>
                    <button className="btn btn-link wc-link">Recent Questions</button>
                </Link>
            </div>
        );
    }
}

const reduxToComponentMapper = (state) => {
    return {
        isLoggedIn: state.userProfile.isLoggedIn,
        userDetails: state.userProfile.userDetails,
    };
};

export default connect(reduxToComponentMapper)(WelcomeView);
