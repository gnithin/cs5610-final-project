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
                console.log("DEBUG: questionResponse", questionResponse);
                this.setState({
                    questionId: questionResponse.data.id,
                    questionTitle: questionResponse.data.title,
                    questionDescription: questionResponse.data.description,
                    answersToQuestion: questionResponse.data.answers
                });

                SO.searchQuestions(this.state.questionTitle).then((response) => {
                    console.log("DEBUG: SO Data", response);
                    this.setState({
                        relatedQuestions: response
                    })
                });
                console.log("DEBUG: Related Questions are:",
                    this.state.relatedQuestions);

            } else {
                this.props.history.push("/");
            }
        });
    }

    createAnswerToQuestion = (answerToPost, questionId) => {
        console.log("DEBUG: Posting Answer", answerToPost, questionId);
        if (answerToPost.trim() !== "") {
            let answerToSend = {
                "answer": answerToPost.trim()
            };
            console.log("DEBUG: Answer To Send", answerToSend);
            questionAnswerService.createAnswerForQuestion(answerToSend,
                questionId).then(responseStatus => {
                console.log("DEBUG: Answer Response received", responseStatus.data);
                if (responseStatus.status === 1) {
                    this.setState({
                        answerToPost: "",
                        answersToQuestion: [
                            {"answer": responseStatus.data.answer},
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
                /*console.log('DEBUG: cannot Delete Question',responseStatus);*/
            } else {
                console.log('DEBUG: cannot Delete Question', responseStatus);
            }
        })
    };

    deleteAnswer = (answerId) => {
        questionAnswerService.deleteAnswer(answerId).then(responseStatus => {
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
                                                    <span>{eachAnswer.answer}</span>
                                                    <div>
                                                        <i className="fas fa-thumbs-up p-5"/>
                                                        <span>{eachAnswer.totalReputation}</span>
                                                        <i className="fas fa-thumbs-down p-5"/>
                                                        {
                                                            this.props.isAdmin
                                                            &&
                                                            <button className={"btn btn-danger"}
                                                                    onClick={() => this.deleteAnswer(eachAnswer.id)}>
                                                                <i className={"fas fa-trash-alt mr-2"}/>
                                                                Delete Answer
                                                            </button>
                                                        }
                                                    </div>
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
    console.log('DEBUG: isAdmin state',state.userProfile.isAdmin);
    return {
        isAdmin: state.userProfile.isAdmin
    }
};

/*const dispatchMapper = (dispatch) => {

  return {}
};*/
export default connect(stateMapper)(displayQuestionAnswerView);
