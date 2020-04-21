import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import Utils from "../../common/utils";
import EditProfile from "./editProfile";
import {editUserProfileData} from "../../services/profileService";
import userProfileActions from "../../redux/actions/userProfileActions";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            editErrorMsg: "",
        };
    }

    render() {
        if (this.props.isLoading || Utils.isNull(this.props.user)) {
            return (<React.Fragment/>)
        }

        if (this.state.isEditing) {
            return this.renderEditableSidebar();
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

                <div className="avatar-wrapper row">
                    <div className="avatar col-12" style={{backgroundColor: Utils.stringToColour(`${user.id}`)}}>
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

        if (this.state.isEditing) {
            return (
                <React.Fragment/>
            );
        }

        return (
            <div className="col col-md-5 profile-edit-btn-wrapper">
                <button className="btn btn-primary" onClick={() => {
                    this.setState({isEditing: true});
                }}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    &nbsp; Edit
                </button>
            </div>
        );
    }

    renderEditableSidebar() {
        return (
            <EditProfile
                key={this.props.user.id}
                user={this.props.user}
                onSubmitCb={this.editUserHandler.bind(this)}
                errorMsg={this.state.editErrorMsg}
            />
        );
    }

    editUserHandler(data) {
        console.log("Sending data - ", data);
        editUserProfileData(this.props.user.id, data).then((resp) => {
            // Update the stored user entries
            this.props.updateUserDetails(resp);

            // Remove the edit option
            this.setState({isEditing: false});
            this.props.triggerResetCb();

        }).catch(e => {
            this.setState({editErrorMsg: "Unable to update profile!"})
        });
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

const stateToReduxMapper = (dispatcher) => {
    return {
        updateUserDetails: (user) => {
            return dispatcher(userProfileActions.setUserData(user));
        }
    }
};

export default connect(reduxToStateMapper, stateToReduxMapper)(Sidebar);
