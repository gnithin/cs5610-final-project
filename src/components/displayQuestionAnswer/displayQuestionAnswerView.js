import React, {Component} from 'react';
import {connect} from "react-redux";
import NavBarComponent from "../navbar/NavBarComponent";

import questionAnswerService from "../../services/questionAnswerService";
import SO from "../../services/stackOverflowService";
import './displayQuestionAnswer.css'
import Utils from "../../common/utils";

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
            questionAnswerService.deleteVote(eachAnswer.id).then(response => {
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
            questionAnswerService.deleteVote(eachAnswer.id).then(response => {
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
                }
            });
        }
    };

    render() {
        return (
            <div className={''}>
                <NavBarComponent/>

                <div className={'container-fluid'}>
                    <div className="row">
                        <div className={'col-md-8 dq-question-wrapper'}>
                            {this.renderQuestion()}

                            <div className="col-12 dq-entry">
                                {this.renderAnswers()}
                                {this.renderPostAnswer()}
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
                                        {eachItem.title}
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
                    {this.state.questionDescription}
                </div>
            </React.Fragment>
        );
    }

    renderQuestionVotes() {
        // TODO: Link up the votes for the question
        return (
            <div className="dq-question-votes-wrapper">
                <button className="btn btn-outline-secondary">
                    <i className="fas fa-thumbs-up"/>
                </button>
                <span className="dq-question-vote">{this.state.questionVotes}</span>
                <button className="btn btn-outline-secondary">
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
                                    <span className={'card-body'}>{eachAnswer.answer}</span>
                                    <div className={'card-footer'}>
                                <span className={'pull-left'}>
                                    Answered by <strong>{eachAnswer.user.name}</strong>
                                </span>

                                        <span className={'pull-right'}>
                                    <button
                                        className={`btn ${eachAnswer.currentUserVote === 1 ? "btn-outline-success" : "btn-outline-secondary"}`}
                                        onClick={() => {
                                            this.upVoteAnswer(eachAnswer)
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
                                            this.downVoteAnswer(eachAnswer)
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
                                        <textarea className={'form-control mb-4'}
                                                  rows={'4'}
                                                  value={this.state.answerToPost}
                                                  placeholder="Post your answer here..."
                                                  onChange={(event) => {
                                                      this.setState({
                                                          answerToPost: event.target.value
                                                      })
                                                  }}>
                                        </textarea>
                <button className={'btn btn-success'}
                        onClick={() => this.createAnswerToQuestion(
                            this.state.answerToPost,
                            this.state.questionId)}>
                    Post Answer
                </button>
            </div>
        );
    }
}

const stateMapper = (state) => {
    return {
        isAdmin: state.userProfile.isAdmin
    }
};

export default connect(stateMapper)(displayQuestionAnswerView);
