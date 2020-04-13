import React, {Component} from 'react';
import '../createQuestion/createQuestionView.css'
import NavBarComponent from "../navbar/NavBarComponent";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import questionService from "../../services/questionService";
import homeImage from "./logo.png";

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

    render() {
        return (
            <div>
                <NavBarComponent/>

                <div className="text-center mt-3 mb-2">
                    <Link className={"btn btn-success"} to={"login"}>Login</Link>
                    <Link className={"btn btn-primary ml-5"} to={"register"}>Register</Link>
                </div>

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
                            this.state.questionList.map(function (eachQuestion) {
                                return (
                                    <tr key={eachQuestion.id}>
                                        <td className="pl-5 pt-4">
                                            <Link to={`/question/${eachQuestion.id}`}>
                                                {eachQuestion.title}
                                            </Link>
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
    console.log(state);
    return {
        questionList: state.questionList
    }

};

const dispatchMapper = (dispatch) => {
    console.log("DEBUG: stateMapper in getAllQuestions called first");
    return {
        getAllQuestions: () => {
            dispatch()
        }
    }

};
export default connect(stateMapper, dispatchMapper)(HomeView);
