import React, {Component} from 'react';
import NavBarComponent from "../navbar/NavBarComponent";
import {connect} from "react-redux";
import profileService from "../../services/profileService";
import userAction from "../../redux/actions/userProfileActions";
import './profile.css'
import Utils from "../../common/utils";
import {withRouter} from "react-router-dom";

const MAX_COUNT_DETAILS = 180;


class ProfileView extends Component {
    state = {
        userProfileData: {}
    };

    componentDidMount() {
        // Why are we calling this?
        // loginService.currentLoggedInService().then(response => {
        //     if (response.status === 1) {
        //         this.props.setIsLogin(true, response.data);
        //     } else {
        //         this.props.setIsLogin(false, {});
        //     }
        // });

        profileService.getUserProfileData(this.props.match.params.userId).then(
            userProfileData => {
                if (userProfileData.status === 1) {
                    this.setState({
                        userProfileData: userProfileData.data
                    });
                } else {
                    this.props.history.push("/home");
                }
            }
        );
    }

    renderSidebar() {
        return (
            <div className="sidebar-wrapper">
                <h2>Profile</h2>
                <div className="avatar-wrapper">
                    <div className="avatar">
                    </div>
                </div>

                <div className="profile-entry">
                    <div className="profile-entry-header">
                        <i className="fa fa-user" aria-hidden="true"></i> &nbsp; Name
                    </div>
                    <div className="profile-entry-content">
                        {this.state.userProfileData.name}
                    </div>
                </div>

                {false === Utils.isNull(this.state.userProfileData.email) &&
                <div className="profile-entry">
                    <div className="profile-entry-header">
                        <i className="fa fa-envelope" aria-hidden="true"></i> &nbsp; Email
                    </div>
                    <div className="profile-entry-content">
                        {this.state.userProfileData.email}
                    </div>
                </div>
                }

                <div className="profile-entry">
                    <div className="profile-entry-header">
                        <i className="fa fa-star" aria-hidden="true"></i> &nbsp; Reputation
                    </div>
                    <div className="profile-entry-content">
                        {this.state.userProfileData.totalReputation}
                    </div>
                </div>

                <div className="profile-entry">
                    <div className="profile-entry-header">
                        <i className="fa fa-lock" aria-hidden="true"></i> &nbsp; Admin
                    </div>
                    <div className="profile-entry-content">
                        {(this.state.userProfileData.isAdmin) ? "Yes" : "No"}
                    </div>
                </div>
            </div>
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
        if (Utils.isNull(questions)) {
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
                                    {Utils.limitSentence(question.description, MAX_COUNT_DETAILS)}
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
        if (Utils.isNull(answers)) {
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
                                    {Utils.limitSentence(answer.answer, MAX_COUNT_DETAILS)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                <NavBarComponent/>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            {this.renderSidebar()}
                        </div>
                        <div className="col-12 col-sm-8">
                            {this.renderActivity()}
                        </div>
                    </div>

                    {/*                            <th scope="col"*/}
                    {/*                                className="d-flex justify-content-center">*/}
                    {/*                                All Questions Asked*/}
                    {/*                            </th>*/}
                    {/*                        </tr>*/}
                    {/*                        </thead>*/}
                    {/*                        {*/}
                    {/*                            this.state.userProfileData.questions*/}
                    {/*                            &&*/}
                    {/*                            <tbody>*/}
                    {/*                            {*/}
                    {/*                                this.state.userProfileData.questions.map((eachQuestion, index) => {*/}
                    {/*                                    if (index < 6) {*/}
                    {/*                                        return (*/}
                    {/*                                            <tr key={index}>*/}
                    {/*                                                <td className="pl-5 pt-4">*/}
                    {/*                                                    <Link to={`/profile/:userId`}>*/}
                    {/*                                                        {eachQuestion.title}*/}
                    {/*                                                    </Link>*/}
                    {/*                                                </td>*/}
                    {/*                                            </tr>*/}
                    {/*                                        )*/}
                    {/*                                    }*/}
                    {/*                                    return null;*/}
                    {/*                                })*/}
                    {/*                            }*/}
                    {/*                            </tbody>*/}
                    {/*                        }*/}
                    {/*                        {*/}
                    {/*                            (typeof (this.state.userProfileData.questions) === "undefined" || this.state.userProfileData.questions.length <= 0)*/}
                    {/*                            &&*/}
                    {/*                            <tbody>*/}
                    {/*                            <tr>*/}
                    {/*                                <td className="pl-5 pt-4"/>*/}
                    {/*                            </tr>*/}
                    {/*                            <tr>*/}
                    {/*                                <td className="pl-5 pt-4"/>*/}
                    {/*                            </tr>*/}
                    {/*                            <tr>*/}
                    {/*                                <td className="pl-5 pt-4"/>*/}
                    {/*                            </tr>*/}
                    {/*                            <tr>*/}
                    {/*                                <td className="pl-5 pt-4"/>*/}
                    {/*                            </tr>*/}
                    {/*                            <tr>*/}
                    {/*                                <td className="pl-5 pt-4"/>*/}
                    {/*                            </tr>*/}
                    {/*                            </tbody>*/}
                    {/*                        }*/}
                    {/*                    </table>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className={"row"}>*/}
                    {/*                <div className={"col-12"}>*/}
                    {/*                    <table className="table table-striped">*/}
                    {/*                        <thead>*/}
                    {/*                        <tr>*/}
                    {/*                            <th scope="col"*/}
                    {/*                                className="d-flex justify-content-center">*/}
                    {/*                                All Questions Answered*/}
                    {/*                            </th>*/}
                    {/*                        </tr>*/}
                    {/*                        </thead>*/}
                    {/*                        {*/}
                    {/*                            this.state.userProfileData.answers*/}
                    {/*                            &&*/}
                    {/*                            <tbody>*/}
                    {/*                            {*/}
                    {/*                                this.state.userProfileData.answers.map((eachAnswer, index) => {*/}
                    {/*                                    if (index < 6) {*/}
                    {/*                                        return (*/}
                    {/*                                            <tr key={index}>*/}
                    {/*                                                <td className="pl-5 pt-4">*/}
                    {/*                                                    <Link to={`/profile/:userId`}>*/}
                    {/*                                                        {eachAnswer.answer}*/}
                    {/*                                                    </Link>*/}
                    {/*                                                </td>*/}
                    {/*                                            </tr>*/}
                    {/*                                        )*/}
                    {/*                                    }*/}
                    {/*                                    return null;*/}
                    {/*                                })*/}
                    {/*                            }*/}
                    {/*                            </tbody>*/}
                    {/*                        }*/}
                    {/*                        {*/}
                    {/*                            (typeof (this.state.userProfileData.answers) === "undefined" || this.state.userProfileData.answers.length <= 0)*/}
                    {/*                            &&*/}
                    {/*                            <tbody>*/}
                    {/*                            <tr>*/}
                    {/*                                <td className="pl-5 pt-4"/>*/}
                    {/*                            </tr>*/}
                    {/*                            <tr>*/}
                    {/*                                <td className="pl-5 pt-4"/>*/}
                    {/*                            </tr>*/}
                    {/*                            <tr>*/}
                    {/*                                <td className="pl-5 pt-4"/>*/}
                    {/*                            </tr>*/}
                    {/*                            <tr>*/}
                    {/*                                <td className="pl-5 pt-4"/>*/}
                    {/*                            </tr>*/}
                    {/*                            <tr>*/}
                    {/*                                <td className="pl-5 pt-4"/>*/}
                    {/*                            </tr>*/}
                    {/*                            </tbody>*/}
                    {/*                        }*/}
                    {/*                    </table>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

            </React.Fragment>
        );
    }
}

const stateMapper = (state) => {
    return {
        userProfileData: state.userProfile.userProfileData
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
