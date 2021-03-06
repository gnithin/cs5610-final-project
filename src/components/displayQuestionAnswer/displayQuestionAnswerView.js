import React, {Component} from 'react';
import {connect} from "react-redux";
import NavBarComponent from "../navbar/NavBarComponent";

import questionAnswerService from "../../services/questionAnswerService";
import SO from "../../services/stackOverflowService";
import './displayQuestionAnswer.css'
import Utils from "../../common/utils";
import ComponentUtils from "../../common/componentUtils";
import {Link} from "react-router-dom";

class displayQuestionAnswerView extends Component {

    state = {
        questionId: "",
        questionTitle: "",
        questionDescription: "",
        answersToQuestion: [],
        answerToPost: "",
        relatedQuestions: {items: []},
        questionAuthor: null,
        questionVotes: 0,
        currentUserVoteForQuestion: null,
    };

    componentDidMount() {
        questionAnswerService.findQuestionDetails(
            this.props.match.params.questionId).then(questionResponse => {
            if (questionResponse.status === 1) {
                this.setState({
                    questionId: questionResponse.data.id,
                    questionTitle: questionResponse.data.title,
                    questionDescription: questionResponse.data.description,
                    answersToQuestion: questionResponse.data.answers,
                    questionAuthor: questionResponse.data.user,
                    questionVotes: questionResponse.data.totalReputation,
                    currentUserVoteForQuestion: questionResponse.data.currentUserVote,
                });

                SO.searchQuestions(this.state.questionTitle).then((response) => {
                    this.setState({
                        relatedQuestions: response
                    })
                });
            } else {
                this.props.history.push("/");
            }
        });
    }

    createAnswerToQuestion = (answerToPost, questionId) => {
        if (answerToPost.trim() !== "") {
            let answerToSend = {
                "answer": answerToPost.trim()
            };
            questionAnswerService.createAnswerForQuestion(answerToSend,
                questionId).then(responseStatus => {
                if (responseStatus.status === 1) {
                    this.setState({
                        answerToPost: "",
                        answersToQuestion: [
                            responseStatus.data,
                            ...this.state.answersToQuestion
                        ],
                    });
                }
            })
        }
    };

    deleteQuestion = () => {
        questionAnswerService.deleteQuestion(this.state.questionId).then(responseStatus => {
            if (responseStatus.status === 1) {
                this.props.history.push("/");
            } else {
                console.log('DEBUG: cannot Delete Question', responseStatus);
            }
        })
    };

    deleteAnswer = (answerId) => {
        questionAnswerService.deleteAnswer(parseInt(answerId)).then(responseStatus => {
            if (responseStatus.status === 1) {
                let newAnswerArray = this.state.answersToQuestion.filter(eachAnswer => eachAnswer.id !== answerId);
                this.setState({
                    answersToQuestion: newAnswerArray
                })
            } else {
                console.log('DEBUG: cannot Delete Answer', responseStatus);
            }
        })
    };

    upVoteAnswer = (eachAnswer) => {
        let answerIndex = this.state.answersToQuestion.findIndex(answer => eachAnswer.id === answer.id);
        let updatedAnswerArray = [];
        let updateUpVote = this.state.answersToQuestion.filter(answer => eachAnswer.id === answer.id);

        if (eachAnswer.currentUserVote === 1) {
            updateUpVote[0]["currentUserVote"] = 0;
            updateUpVote[0]["totalReputation"] = parseInt(updateUpVote[0]["totalReputation"]) - 1;
            questionAnswerService.deleteAnswerVote(eachAnswer.id).then(response => {
                if (response.status === 1) {
                    updatedAnswerArray = [
                        ...this.state.answersToQuestion.slice(0, answerIndex),
                        updateUpVote[0],
                        ...this.state.answersToQuestion.slice(answerIndex + 1)
                    ];

                    this.setState({
                        answersToQuestion: updatedAnswerArray
                    });
                }
            });
        } else if (eachAnswer.currentUserVote === -1) {
            updateUpVote[0]["currentUserVote"] = 1;
            updateUpVote[0]["totalReputation"] = parseInt(updateUpVote[0]["totalReputation"]) + 2;
            questionAnswerService.upVoteAnswer(eachAnswer.id).then(response => {
                if (response.status === 1) {
                    updatedAnswerArray = [
                        ...this.state.answersToQuestion.slice(0, answerIndex),
                        updateUpVote[0],
                        ...this.state.answersToQuestion.slice(answerIndex + 1)
                    ];

                    this.setState({
                        answersToQuestion: updatedAnswerArray
                    });
                }
            });
        } else {
            updateUpVote[0]["currentUserVote"] = 1;
            updateUpVote[0]["totalReputation"] = parseInt(updateUpVote[0]["totalReputation"]) + 1;
            questionAnswerService.upVoteAnswer(eachAnswer.id).then(response => {
                if (response.status === 1) {
                    updatedAnswerArray = [
                        ...this.state.answersToQuestion.slice(0, answerIndex),
                        updateUpVote[0],
                        ...this.state.answersToQuestion.slice(answerIndex + 1)
                    ];

                    this.setState({
                        answersToQuestion: updatedAnswerArray
                    });
                } else if (response.responseCode === 401) {
                    this.props.history.push('/login');
                }
            });
        }
    };

    downVoteAnswer = (eachAnswer) => {
        let answerIndex = this.state.answersToQuestion.findIndex(answer => eachAnswer.id === answer.id);
        let updatedAnswerArray = [];
        let updateDownVote = this.state.answersToQuestion.filter(answer => eachAnswer.id === answer.id);

        if (eachAnswer.currentUserVote === -1) {
            updateDownVote[0]["currentUserVote"] = 0;
            updateDownVote[0]["totalReputation"] = parseInt(updateDownVote[0]["totalReputation"]) + 1;
            questionAnswerService.deleteAnswerVote(eachAnswer.id).then(response => {
                if (response.status === 1) {
                    updatedAnswerArray = [
                        ...this.state.answersToQuestion.slice(0, answerIndex),
                        updateDownVote[0],
                        ...this.state.answersToQuestion.slice(answerIndex + 1)
                    ];

                    this.setState({
                        answersToQuestion: updatedAnswerArray
                    });
                }
            });
        } else if (eachAnswer.currentUserVote === 1) {
            updateDownVote[0]["currentUserVote"] = -1;
            updateDownVote[0]["totalReputation"] = parseInt(updateDownVote[0]["totalReputation"]) - 2;
            questionAnswerService.downVoteAnswer(eachAnswer.id).then(response => {
                if (response.status === 1) {
                    updatedAnswerArray = [
                        ...this.state.answersToQuestion.slice(0, answerIndex),
                        updateDownVote[0],
                        ...this.state.answersToQuestion.slice(answerIndex + 1)
                    ];

                    this.setState({
                        answersToQuestion: updatedAnswerArray
                    });
                }
            });
        } else {
            updateDownVote[0]["currentUserVote"] = -1;
            updateDownVote[0]["totalReputation"] = parseInt(updateDownVote[0]["totalReputation"]) - 1;
            questionAnswerService.downVoteAnswer(eachAnswer.id).then(response => {
                if (response.status === 1) {
                    updatedAnswerArray = [
                        ...this.state.answersToQuestion.slice(0, answerIndex),
                        updateDownVote[0],
                        ...this.state.answersToQuestion.slice(answerIndex + 1)
                    ];

                    this.setState({
                        answersToQuestion: updatedAnswerArray
                    });
                } else if (response.responseCode === 401) {
                    this.props.history.push('/login');
                }
            });
        }
    };

    upVoteQuestion = (currentState) => {
        if (currentState.currentUserVoteForQuestion === 0) {
            questionAnswerService.upVoteQuestion(currentState.questionId).then(response => {
                if (response.status === 1) {
                    this.setState({
                        questionVotes: parseInt(currentState.questionVotes) + 1,
                        currentUserVoteForQuestion: 1
                    });
                } else if (response.responseCode === 401) {
                    this.props.history.push('/login');
                }
            });
        } else if (currentState.currentUserVoteForQuestion === -1) {
            questionAnswerService.upVoteQuestion(currentState.questionId).then(response => {
                if (response.status === 1) {
                    this.setState({
                        questionVotes: parseInt(currentState.questionVotes) + 2,
                        currentUserVoteForQuestion: 1
                    });
                } else if (response.responseCode === 401) {
                    this.props.history.push('/login');
                }
            });
        } else {
            questionAnswerService.deleteQuestionVote(currentState.questionId).then(response => {
                if (response.status === 1) {
                    this.setState({
                        questionVotes: parseInt(currentState.questionVotes) - 1,
                        currentUserVoteForQuestion: 0
                    });
                } else if (response.responseCode === 401) {
                    this.props.history.push('/login');
                }
            });
        }
    };

    downVoteQuestion = (currentState) => {
        if (currentState.currentUserVoteForQuestion === 0) {
            questionAnswerService.downVoteQuestion(currentState.questionId).then(response => {
                if (response.status === 1) {
                    this.setState({
                        questionVotes: parseInt(currentState.questionVotes) - 1,
                        currentUserVoteForQuestion: -1
                    });
                } else if (response.responseCode === 401) {
                    this.props.history.push('/login');
                }
            });
        } else if (currentState.currentUserVoteForQuestion === 1) {
            questionAnswerService.downVoteQuestion(currentState.questionId).then(response => {
                if (response.status === 1) {
                    this.setState({
                        questionVotes: parseInt(currentState.questionVotes) - 2,
                        currentUserVoteForQuestion: -1
                    });
                } else if (response.responseCode === 401) {
                    this.props.history.push('/login');
                }
            });
        } else {
            questionAnswerService.deleteQuestionVote(this.state.questionId).then(response => {
                if (response.status === 1) {
                    this.setState({
                        questionVotes: parseInt(currentState.questionVotes) + 1,
                        currentUserVoteForQuestion: 0
                    });
                } else if (response.responseCode === 401) {
                    this.props.history.push('/login');
                }
            });
        }
    };

    render() {
        return (
            <div className={''}>
                <NavBarComponent/>

                <div className={'container-fluid dq-wrapper'}>
                    <div className="row">
                        <div className={'col-md-8 dq-question-wrapper'}>
                            {this.renderQuestion()}

                            <div className="col-12 dq-entry">
                                {this.renderAnswers()}
                                {this.props.isLoggedIn && this.renderPostAnswer()}
                            </div>
                        </div>

                        <div className={'col-md-4'}>
                            <div className="dq-similar-questions-wrapper">
                                <div className="col-12">
                                    <h3>Similar Questions from StackOverflow</h3>
                                    {this.renderRelatedQA()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    renderRelatedQA() {
        if (Utils.isNull(this.state.relatedQuestions) || this.state.relatedQuestions.items.length === 0) {
            return (<div>No match found!</div>)
        }

        return (
            <ul className="list-group">
                {
                    this.state.relatedQuestions.items.slice(0, 10).map(
                        (eachItem, index) => {
                            return (
                                <li className="list-group-item" key={index}>
                                    <a
                                        target={'_blank'}
                                        rel="noopener noreferrer"
                                        href={eachItem.link}
                                    >
                                        {Utils.htmlUnescape(eachItem.title)}
                                    </a>
                                </li>
                            )
                        }
                    )
                }
            </ul>
        );
    }

    renderQuestion() {
        let author = (<span></span>);
        if (false === Utils.isNull(this.state.questionAuthor)) {
            author = (
                <a
                    href={`/profiles/${this.state.questionAuthor.id}`}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {this.state.questionAuthor.name}
                </a>
            );
        }

        return (
            <React.Fragment>
                <div className="col-12 dq-entry dq-question-head-wrapper" id={'questionTitle'}>
                    <div className="dq-question-head">
                        <div className="dq-question-title">{this.state.questionTitle}</div>
                        <div className="dq-question-author">
                            Asked by - {author}
                        </div>
                    </div>
                    {this.renderQuestionVotes()}
                </div>

                {
                    this.props.isAdmin
                    &&
                    <div className={"col-12 dq-entry"}>
                        <button className={"btn btn-danger"} onClick={() => this.deleteQuestion()}>
                            <i className={"fas fa-trash-alt"}/>
                            &nbsp; Delete Question
                        </button>
                    </div>
                }

                <div className="col-12 dq-entry dq-question-description" id="questionDesc">
                    {ComponentUtils.getMarkdownComponentForText(this.state.questionDescription)}
                </div>
            </React.Fragment>
        );
    }

    renderQuestionVotes() {
        return (
            <div className="dq-question-votes-wrapper">
                <button
                    className={`btn ${this.state.currentUserVoteForQuestion === 1 ? "btn-outline-success" : "btn-outline-secondary"}`}
                    onClick={() => {
                        this.upVoteQuestion(this.state);
                    }}
                >
                    <i className="fas fa-thumbs-up"/>
                </button>
                <span className="dq-question-vote">
                    <strong>{this.state.questionVotes}</strong>
                </span>
                <button
                    className={`btn ${this.state.currentUserVoteForQuestion === -1 ? "btn-outline-danger" : "btn-outline-secondary"}`}
                    onClick={() => {
                        this.downVoteQuestion(this.state);
                    }}
                >
                    <i className="fas fa-thumbs-down"/>
                </button>
            </div>
        );
    }

    renderAnswers() {
        if (Utils.isNull(this.state.answersToQuestion) || this.state.answersToQuestion.length === 0) {
            return (
                <div className="dq-empty-answer">
                    No answers yet. Be the first to answer!
                </div>
            );
        }

        return (
            <React.Fragment>
                <h3>Answers</h3>
                <hr/>
                {this.state.answersToQuestion.map(
                    (eachAnswer, index) => {
                        return (
                            <div key={index}>
                                <div className={'card '}>
                                    <span className={'card-body '}>
                                        {ComponentUtils.getMarkdownComponentForText(eachAnswer.answer)}
                                    </span>
                                    <div className={'card-footer'}>
                                <span className={'pull-left'}>
                                    Answered by <Link target={'_blank'} to={`/profiles/${eachAnswer.user.id}`}><strong>{eachAnswer.user.name}</strong></Link>
                                </span>

                                        <span className={'pull-right'}>
                                    <button
                                        className={`btn ${eachAnswer.currentUserVote === 1 ? "btn-outline-success" : "btn-outline-secondary"}`}
                                        onClick={() => {
                                            this.upVoteAnswer(eachAnswer);
                                        }}
                                    >
                                        <i className={"fas fa-thumbs-up"}/>
                                    </button>

                                    <span className={'btn'}>
                                        <strong>{eachAnswer.totalReputation}</strong>
                                    </span>

                                    <button
                                        className={`btn ${eachAnswer.currentUserVote === -1 ? "btn-outline-danger" : "btn-outline-secondary"}`}
                                        onClick={() => {
                                            this.downVoteAnswer(eachAnswer);
                                        }}>
                                        <i className={"fas fa-thumbs-down "}/>
                                    </button>

                                            {
                                                this.props.isAdmin
                                                &&
                                                <button className={"btn btn-outline-danger ml-1"}
                                                        onClick={() => this.deleteAnswer(eachAnswer.id)}>
                                                    <i className={"fas fa-trash-alt "}/>
                                                </button>
                                            }
                               </span>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        );
                    })}
            </React.Fragment>
        );
    }

    renderPostAnswer() {
        return (
            <div className={'mb-4'}>
                <textarea
                    className={'form-control mb-4'}
                    rows={'4'}
                    value={this.state.answerToPost}
                    placeholder="Post your answer here..."
                    onChange={(event) => {
                        this.setState({
                            answerToPost: event.target.value
                        })
                    }}>
                </textarea>

                <div className="answer-preview">
                    {this.renderPreview()}
                </div>

                <button className={'btn btn-success'}
                        onClick={() => this.createAnswerToQuestion(
                            this.state.answerToPost,
                            this.state.questionId)}>
                    Post Answer
                </button>
            </div>
        );
    }

    renderPreview() {
        if (Utils.isEmptyStr(this.state.answerToPost)) {
            return (
                <React.Fragment/>
            );
        }

        return (
            <React.Fragment>
                <div className="font-weight-bold">Answer Preview</div>
                <div className="qa-answer-preview">
                    {ComponentUtils.getMarkdownComponentForText(this.state.answerToPost)}
                </div>
            </React.Fragment>
        );
    }
}

const stateMapper = (state) => {
    return {
        isAdmin: state.userProfile.isAdmin,
        isLoggedIn: state.userProfile.isLoggedIn,
    }
};

export default connect(stateMapper)(displayQuestionAnswerView);
