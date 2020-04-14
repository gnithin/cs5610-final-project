import React, {Component} from 'react';
import '../createQuestion/createQuestionView.css'
import NavBarComponent from "../navbar/NavBarComponent";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import questionService from "../../services/questionService";
// import homeImage from "./logo.png";
import questionAnswerService from "../../services/questionAnswerService";

class HomeView extends Component {
    state = {
        questionList: []
    };

    componentDidMount() {
        questionService.getQuestionService().then((allQuestions) => {
            if (allQuestions.status === 1) {
                this.setState({
                    questionList: allQuestions.data
                });
            }
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

                <div>
                    <table className="table table-striped vp-cs5610-table-layout">
                        <thead>
                        <tr>
                            <th scope="col"
                                className="pl-5">
                                All Questions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.questionList
                            &&
                            this.state.questionList.map((eachQuestion) => {
                                return (
                                    <tr key={eachQuestion.id}>
                                        <td className="pl-5 pt-4">
                                            <Link to={`/question/${eachQuestion.id}`}>
                                                {eachQuestion.title}
                                            </Link>
                                            {
                                                this.props.isAdmin
                                                &&
                                                <span className={"float-right"}>
                                                    <button className={"btn btn-danger"}
                                                            onClick={() => this.deleteQuestion(eachQuestion.id)}>
                                                        <i className={"fas fa-trash-alt mr-2"}></i>
                                                        Delete Question
                                                    </button>
                                                </span>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>

                {/*<div className="text-center">
                    <img src={homeImage}
                         className={"rounded mx-auto d-block pt-5"}
                         alt={"Chowk"}/>
                </div>
                <div className="text-center mt-5">
                    <Link className={"btn btn-success"} to={"login"}>Login</Link>
                    <Link className={"btn btn-primary ml-5"} to={"register"}>Register</Link>
                </div>*/}

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
