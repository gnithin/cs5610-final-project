import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Utils from "../../common/utils";

class DefaultProfileView extends Component {
    render() {
        let link = "/login";
        if (true === this.props.isLoggedIn && false === Utils.isNull(this.props.loggedInUser)) {
            link = `/profiles/${this.props.loggedInUser.id}`;
        }

        return (
            <Redirect
                to={link}
            />
        );
    }
}

const reduxToStateMapper = (state) => {
    return {
        isLoggedIn: state.userProfile.isLoggedIn,
        loggedInUser: state.userProfile.userDetails,
    };
};

export default connect(reduxToStateMapper)(DefaultProfileView);
