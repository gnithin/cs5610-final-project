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

class HomeView extends Component {
    state = {
        questionList: [],
        isLoading: true,
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
                {
                    !this.props.isLoggedIn
                    &&
                    <div className="text-center mt-3 mb-2">
                        <Link className={"btn btn-success"} to={"login"}>Login</Link>
                        <Link className={"btn btn-primary ml-5"} to={"register"}>Register</Link>
                    </div>
                }
                <div className="container-fluid home-content-wrapper">
                    <div className="row">
                        <div className="offset-1 col-9 home-header">
                            <h2>New Questions</h2>
                        </div>
                        {this.renderQuestions()}
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
                        className="card offset-1 col-9 question-entry"
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
                                <p className="card-text text-truncate">
                                </p>
                                <h6 className="card-subtitle mb-2 text-muted">By {username}</h6>
                            </div>
                        </div>
                    </div>
                );
            })
        );
    }

    renderAdminDelete(deleteCb) {
        if (false === this.props.isAdmin) {
            return (<React.Fragment/>);
        }

        return (
            <div className="admin-delete-question">
                <button
                    className="btn btn-danger"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteCb()
                    }}>
                    <i className={"fas fa-trash-alt"}></i>
                </button>
            </div>
        );
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
