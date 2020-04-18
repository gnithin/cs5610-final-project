import React, {Component} from 'react';
import {connect} from "react-redux";
import NavBarComponent from "../navbar/NavBarComponent";

import questionAnswerService from "../../services/questionAnswerService";
import SO from "../../services/stackOverflowService";

class displayQuestionAnswerView extends Component {

    state = {
        questionId: "",
        questionTitle: "",
        questionDescription: "",
        answersToQuestion: [],
        answerToPost: "",
        relatedQuestions: {items: []}
    };

    componentDidMount() {
        questionAnswerService.findQuestionDetails(
            this.props.match.params.questionId).then(questionResponse => {
            if (questionResponse.status === 1) {
                this.setState({
                    questionId: questionResponse.data.id,
                    questionTitle: questionResponse.data.title,
                    questionDescription: questionResponse.data.description,
                    answersToQuestion: questionResponse.data.answers
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

                {
                    this.props.isAdmin
                    &&
                    <div className={"row float-right mt-2 mr-2"}>
                        <div className={"col"}>
                            <button className={"btn btn-danger"} onClick={() => this.deleteQuestion()}>
                                <i className={"fas fa-trash-alt mr-2"}/>
                                Delete Question
                            </button>
                        </div>
                    </div>
                }

                <div className={'row container-fluid'}>
                    <div className={'col-md-8 '}>
                        <div className={'container mt-5'}>

                            <div className="form-group row">
                                <label htmlFor="questionTitle"
                                       className="col-sm-2 col-form-label">Question</label>
                                <div className="form-control col-sm-10" id={'questionTitle'}>
                                    {this.state.questionTitle}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="questionDesc"
                                       className="col-sm-2 col-form-label">Question
                                    Description</label>
                                <div className="form-control col-sm-10" id="questionDesc">
                                    {this.state.questionDescription}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Selected
                                    Tags</label>
                                <div className="col-sm-10">
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Answer to the
                                    Question</label>
                                <div className="col-sm-10">

                                    <div className={'mb-4'}>
                                        <textarea className={'form-control mb-4'}
                                                  rows={'4'}
                                                  value={this.state.answerToPost}
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

                                    {
                                        this.state.answersToQuestion.map((eachAnswer, index) => {
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
                                                                    }}>
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
                                        })
                                    }

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={'col-md-4 mt-5'}>
                        <div className={'mt-5'}>
                            <div className="col-sm-12">
                                <h3>Similar Questions which might be helpful:</h3>
                                <table className={'table  table-striped table-bordered'}>
                                    <tbody>
                                    {
                                        this.state.relatedQuestions
                                        &&
                                        this.state.relatedQuestions.items.slice(0, 5).map(
                                            (eachItem, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td key={eachItem.id}>
                                                            {eachItem.title}
                                                        </td>
                                                        <td>
                                                            <a target={'_blank'}
                                                               className={'badge badge-pill badge-light'}
                                                               rel="noopener noreferrer"
                                                               href={eachItem.link}>
                                                                link
                                                            </a>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

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
