import React, {Component} from 'react';
import '../createQuestion/createQuestionView.css'
import NavBarComponent from "../navbar/NavBarComponent";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import questionService from "../../services/questionService";

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
                <Link
                    className="btn btn-primary"
                    title="Create Question"
                    to={`/create/question`}
                >
                    Create Question
                </Link>

                <div>
                    <table className="table table-striped vp-cs5610-table-layout">
                        <thead>
                        <tr>
                            <th scope="col"
                                className="pl-5">
                                Question Title
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
