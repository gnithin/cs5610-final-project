import React, {Component} from 'react';
import '../createQuestion/createQuestionView.css'
import NavBarComponent from "../navbar/NavBarComponent";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import questionService from "../../services/questionService";
import questionAnswerService from "../../services/questionAnswerService";
import LoadingComponent from "../loader";
import Utils from "../../common/utils";
import './home.css'
import {format} from "timeago.js";
import profileService from "../../services/profileService";

class HomeView extends Component {
    state = {
        questionList: [],
        isLoading: true,
        userQuestionList: [],
        userAnswerList: [],
    };

    componentDidMount() {
        questionService.getQuestionService().then((allQuestions) => {
            if (allQuestions.status === 1) {
                this.setState({
                    questionList: allQuestions.data
                });
            }
        }).finally(() => {
            this.setState({isLoading: false});
        });

        if (this.props.isLoggedIn) {
            profileService.getUserProfileData(this.props.userData.id).then(r => {
                console.log('DEBUG: Profile Data on home page', r);
                this.setState({
                    userQuestionList: r.data.questions,
                    userAnswerList: r.data.answers
                })
            })
        }
    }


    deleteQuestion = (questionId) => {
        questionAnswerService.deleteQuestion(questionId).then(responseStatus => {
            if (responseStatus.status === 1) {
                const updatedQuestionList = this.state.questionList.filter(eachQuestion => eachQuestion.id !== questionId);
                this.setState({
                    questionList: updatedQuestionList
                })
            } else {
                console.log('DEBUG: cannot Delete Question', responseStatus);
            }
        })
    };

    render() {
        if (this.state.isLoading) {
            return (
                <LoadingComponent
                    message="Fetching questions..."
                />
            );
        }

        return (
            <div>
                <NavBarComponent/>
                <div className="container-fluid home-content-wrapper">
                    {
                        this.props.isLoggedIn
                        &&
                        <div className="row">
                            <div className="offset-1 col-10 col-lg-5 home-header">
                                <h2>My Latest Question</h2>
                                {this.renderMyQuestions()}
                            </div>
                            <div className="offset-lg-0 offset-1 col-10 col-lg-5 home-header">
                                <h2>My Latest Answer</h2>
                                {this.renderMyAnswers()}
                            </div>
                        </div>
                    }
                    <div className="row">
                        <div className="offset-1 col-10 home-header">
                            <h2>New Questions</h2>
                        </div>
                        {this.renderQuestions()}
                    </div>
                    <div className="row">
                        <div className="col-12 home-privacy-wrapper">
                            <Link
                                target="_blank"
                                to={"/privacy-policy"}
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderQuestions() {
        if (
            Utils.isNull(this.state.questionList) ||
            this.state.questionList.length === 0
        ) {
            return (<div>No new questions!. Try refreshing in sometime :)</div>);
        }

        return (
            this.state.questionList.map(question => {
                let username = "";
                if (false === Utils.isNull(question.user)) {
                    username = question.user.name;
                }
                if (Utils.isEmptyStr(username)) {
                    username = "Unknown";
                }

                return (
                    <div
                        className="card offset-1 col-10 question-entry"
                        key={`q-${question.id}`}
                        onClick={(e) => {
                            this.props.history.push(`/questions/${question.id}`);
                        }}
                    >
                        <div className="card-body block-wrapper row">
                            <div className="col-1 rep-block">
                                <div>{question.totalReputation}</div>
                                <div>votes</div>
                            </div>
                            <div className="q-block col-11">
                                {this.renderAdminDelete(() => {
                                    this.deleteQuestion(question.id)
                                })}
                                <h4 className="card-title">{question.title}</h4>
                                <h6 className="card-subtitle text-muted home-q-user">By {username}</h6>
                                <p className="card-text">
                                    {format(question.createdTimestamp)}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })
        );
    }

    renderMyAnswers() {
        if (
            Utils.isNull(this.state.userAnswerList) ||
            this.state.userAnswerList.length === 0
        ) {
            return (<div>No new answers! Try refreshing in sometime :)</div>);
        }

        return (
            this.state.userAnswerList.slice(0,1).map(answer => {
                return (
                    <div
                        className="card col-12 question-entry"
                        key={`q-${answer.id}`}
                        onClick={(e) => {
                            this.props.history.push(`/questions/${answer.question.id}`);
                        }}
                    >
                        <div className="card-body block-wrapper row">
                            <div className="q-block col-12">
                                <h4 className="card-title">{answer.answer}</h4>
                                <p className="card-text">
                                    {format(answer.createdTimestamp)}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })
        );
    }

    renderMyQuestions() {
        if (
            Utils.isNull(this.state.userQuestionList) ||
            this.state.userQuestionList.length === 0
        ) {
            return (<div>No new questions! Try refreshing in sometime :)</div>);
        }

        return (
            this.state.userQuestionList.slice(0, 2).map(question => {
                return (
                    <div
                        className="card col-12 question-entry"
                        key={`q-${question.id}`}
                        onClick={(e) => {
                            this.props.history.push(`/questions/${question.id}`);
                        }}
                    >
                        <div className="card-body block-wrapper row">
                            <div className="q-block col-12">
                                <h4 className="card-title">{question.title}</h4>
                                <p className="card-text">
                                    {format(question.createdTimestamp)}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })
        );
    }

    renderAdminDelete(deleteCb) {
        if (this.props.isAdmin) {
            return (
                <div className="admin-delete-question">
                    <button
                        className="btn btn-danger"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteCb()
                        }}>
                        <i className={"fas fa-trash-alt"}/>
                    </button>
                </div>
            );
        }
        return (<React.Fragment/>);
    }
}

const stateMapper = (state) => {
    return {
        isAdmin: state.userProfile.isAdmin,
        userData: state.userProfile.userDetails,
        isLoggedIn: state.userProfile.isLoggedIn
    }

};

const dispatchMapper = (dispatch) => {
    return {}

};
export default connect(stateMapper, dispatchMapper)(HomeView);
