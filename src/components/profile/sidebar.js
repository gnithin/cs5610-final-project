import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import Utils from "../../common/utils";

class Sidebar extends Component {
    render() {
        if (this.props.isLoading || Utils.isNull(this.props.user)) {
            return (<React.Fragment/>)
        }

        return this.renderReadOnlySidebar();
    }

    renderReadOnlySidebar() {
        let user = this.props.user;
        return (
            <div className="sidebar-wrapper">
                <div className="row">
                    <div className="col col-md-7">
                        <h2>Profile</h2>
                    </div>
                    {this.renderEditButton()}
                </div>
                <div className="avatar-wrapper">
                    <div className="avatar" style={{backgroundColor: Utils.stringToColour(`${user.id}`)}}>
                    </div>
                </div>

                <div className="profile-entry">
                    <div className="profile-entry-header">
                        <i className="fa fa-user" aria-hidden="true"></i> &nbsp; Name
                    </div>
                    <div className="profile-entry-content">
                        {user.name}
                    </div>
                </div>

                {false === Utils.isNull(user.email) &&
                <div className="profile-entry">
                    <div className="profile-entry-header">
                        <i className="fa fa-envelope" aria-hidden="true"></i> &nbsp; Email
                    </div>
                    <div className="profile-entry-content">
                        {user.email}
                    </div>
                </div>
                }

                <div className="profile-entry">
                    <div className="profile-entry-header">
                        <i className="fa fa-star" aria-hidden="true"></i> &nbsp; Reputation
                    </div>
                    <div className="profile-entry-content">
                        {user.totalReputation}
                    </div>
                </div>

                <div className="profile-entry">
                    <div className="profile-entry-header">
                        <i className="fa fa-lock" aria-hidden="true"></i> &nbsp; Admin
                    </div>
                    <div className="profile-entry-content">
                        {(user.isAdmin) ? "Yes" : "No"}
                    </div>
                </div>
            </div>
        );
    }

    renderEditButton() {
        if (
            false === this.props.isLoggedIn ||
            (
                this.props.loggedInUser.isAdmin === false &&
                this.props.user.id !== this.props.loggedInUser.id
            )
        ) {
            return (<React.Fragment/>);
        }

        return (
            <div className="col col-md-5 profile-edit-btn-wrapper">
                <button className="btn btn-primary">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    &nbsp; Edit
                </button>
            </div>
        );
    }
}

Sidebar.propTypes = {
    user: PropTypes.object,
};

const reduxToStateMapper = (state) => {
    return {
        isLoggedIn: state.userProfile.isLoggedIn,
        loggedInUser: state.userProfile.userDetails,
    };
};

export default connect(reduxToStateMapper)(Sidebar);
