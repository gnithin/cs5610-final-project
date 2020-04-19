import React, {Component} from 'react';
import {connect} from "react-redux";
import NavBarComponent from "../navbar/NavBarComponent";
import {createQuestion} from "../../redux/actions/questionActions";
import questionService from '../../services/questionService';
import SO from '../../services/stackOverflowService'
import Utils from "../../common/utils";
import {DebounceInput} from 'react-debounce-input';
import './createQuestionView.css'
import ComponentUtils from "../../common/componentUtils";

class CreateQuestionView extends Component {
    state = {
        questionTitle: "",
        questionDescription: "",
        showMessage: false,
        relatedQuestions: {items: []}
    };

    createQuestionMethod = (title, desc) => {
        let dummy = {
            title: title,
            description: desc
        };
        console.log('create question call here');
        questionService.createQuestionService(dummy).then((res) => {
            console.log(res);
            if (res.status !== 1) {
                throw new Error("");
            }

            this.setState({
                showMessage: true
            });

            setTimeout(function () { //Start the timer
                this.setState({showMessage: false}) //After 1 second, set render to true
            }.bind(this), 2000)

            this.props.createQuestion(res.data);
            let qid = res.data.id;
            this.props.history.push(`/questions/${qid}`);
        }).catch(e => {
            console.error("Question was created!");
        });
    }

    SOQuery = (data) => {
        if (data === "") {
            this.setState({
                relatedQuestions: null,
            });
            return;
        }

        SO.searchQuestions(data).then((resp) => {
            console.log(resp);
            this.setState({
                relatedQuestions: resp
            })
        })

        console.log(this.state.relatedQuestions)
    }

    render() {
        return (
            <div className={''}>
                <NavBarComponent/>
                <div className={'row container-fluid'}>
                    <div className={'col-md-8 cq-question-wrapper'}>

                        <h3>Post your question here:</h3>
                        <div className={'container'}>
                            <div className="form-group row">
                                <label htmlFor="questionTitle"
                                       className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-10">
                                    <DebounceInput
                                        minLength={2}
                                        debounceTimeout={300}
                                        type="text"
                                        className="form-control"
                                        id="questionTitle"
                                        placeholder="Question Title"
                                        value={this.state.questionTitle}
                                        onChange={(e) => {
                                            console.log("DEBUG: - ", e.target.value);
                                            this.setState({
                                                questionTitle: e.target.value
                                            });
                                            this.SOQuery(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    htmlFor="questionDesc"
                                    className="col-sm-2 col-form-label"
                                >
                                    Question
                                    Description
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="questionDesc"
                                        placeholder="Provide details about the problem"
                                        rows={10}
                                        onChange={(e) => {
                                            this.setState({
                                                questionDescription: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="offset-sm-2 col-sm-10">
                                    {this.renderQuestionPreview()}
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button type="submit" onClick={() => this.createQuestionMethod(
                                        this.state.questionTitle, this.state.questionDescription)}
                                            className="btn btn-primary">Post
                                    </button>
                                </div>
                            </div>
                        </div>
                        {this.state.showMessage && <div className={'alert alert-success'}>
                            <strong>
                                Question was created successfully!!
                                Redirecting...
                            </strong>
                        </div>}
                    </div>
                    <div className={'col-md-4 '}>
                        <br/>
                        <h3>Similar Questions from StackOverflow</h3>
                        {this.renderRelatedQA()}
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
                {this.state.relatedQuestions.items.slice(0, 10).map(
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
                )}
            </ul>
        );
    }

    renderQuestionPreview() {
        if (Utils.isEmptyStr(this.state.questionDescription)) {
            return (<React.Fragment/>);
        }

        return (
            <React.Fragment>
                <div className="font-weight-bold">Question Preview</div>
                <div className="cq-markdown-preview">
                    {ComponentUtils.getMarkdownComponentForText(this.state.questionDescription)}
                </div>
            </React.Fragment>
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
    console.log("DEBUG: stateMapper in CreateQuestionView called first");
    return {
        createQuestion: (data) => {
            dispatch(createQuestion(data))

        }
    }

};
export default connect(stateMapper, dispatchMapper)(CreateQuestionView);
