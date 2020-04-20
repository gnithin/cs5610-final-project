import React, {Component} from 'react';
import NavBarComponent from "../navbar/NavBarComponent";
import {connect} from "react-redux";
import profileService from "../../services/profileService";
import userAction from "../../redux/actions/userProfileActions";
import './profile.css'
import Utils from "../../common/utils";
import {withRouter} from "react-router-dom";
import LoadingComponent from "../loader";
import {format} from "timeago.js";
import Sidebar from "./sidebar";

class ProfileView extends Component {
    state = {
        userProfileData: {},
        isLoading: true,
    };

    componentDidMount() {
        profileService.getUserProfileData(this.props.match.params.userId).then(
            userProfileData => {
                if (userProfileData.status === 1) {
                    this.setState({
                        isLoading: false,
                        userProfileData: userProfileData.data
                    });
                } else {
                    this.props.history.push("/home");
                }
            }
        );
    }

    renderActivity() {
        return (
            <div className="activity-wrapper">
                <h2>
                    Activity
                </h2>
                <div className="questions-wrapper">
                    <div className="profile-entry-header">
                        Questions
                    </div>
                    {this.renderQuestions()}
                </div>
                <div className="answers-wrapper">
                    <div className="profile-entry-header">
                        Answers
                    </div>
                    {this.renderAnswers()}
                </div>
            </div>
        )
    }

    renderQuestions() {
        let questions = this.state.userProfileData.questions;
        if (Utils.isNull(questions) || questions.length === 0) {
            return (<div>No questions asked!</div>)
        }

        return (
            <div className="questions-list">
                {questions.map((question) => {
                    return (
                        <div key={`q-${question.id}`} className="card activity-card" onClick={() => {
                            let url = `/questions/${question.id}`;
                            window.open(url, '_blank').focus();
                        }}>
                            <div className="card-body">
                                <div className="activity-heading">
                                    {Utils.limitSentence(question.title)}
                                </div>
                                <div className="activity-contents">
                                    Asked {format(question.createdTimestamp)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    renderAnswers() {
        let answers = this.state.userProfileData.answers;
        if (Utils.isNull(answers) || answers.length === 0) {
            return (<div>No answers given!</div>)
        }

        return (
            <div className="answers-list">
                {answers.map((answer) => {
                    return (
                        <div key={`a-${answer.id}`} className="card activity-card" onClick={() => {
                            let url = `/questions/${answer.question.id}`;
                            window.open(url, '_blank').focus();
                        }}>
                            <div className="card-body">
                                <div className="activity-heading">
                                    {Utils.limitSentence(answer.question.title)}
                                </div>
                                <div className="activity-contents">
                                    Answered {format(answer.createdTimestamp)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <LoadingComponent
                    message="Loading Profile"
                />
            );
        }

        return (
            <React.Fragment>
                <NavBarComponent/>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-sm-3">
                            <Sidebar
                                user={this.state.userProfileData}
                                isLoading={this.state.isLoading}
                            />
                        </div>
                        <div className="col-12 col-sm-9">
                            {this.renderActivity()}
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

const stateMapper = (state) => {
    return {
        isLoggedIn: state.userProfile.isLoggedIn,
        loggedInUser: state.userProfile.userDetails,
    }
};

const dispatchMapper = (dispatch) => {
    return {
        setIsLogin: (loginStatus, userData) => {
            dispatch(userAction.setIsLogin(loginStatus, userData))
        }
    }

};
export default withRouter(connect(stateMapper, dispatchMapper)(ProfileView));
