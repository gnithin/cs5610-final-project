import React, {Component} from 'react';
import {connect} from "react-redux";
import NavBarComponent from "../navbar/NavBarComponent";
import {CREATE_QUESTION, createQuestion} from "../../redux/actions/questionActions";
import questionService from '../../services/questionService';
import SO from '../../services/stackOverflowService'
import Utils from "../../common/utils";
const showdown  = require('showdown');

const markdownConvertor = new showdown.Converter();

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
            if (res.status === 1) {
                this.setState({
                                  showMessage: true
                              })

                setTimeout(function () { //Start the timer
                    this.setState({showMessage: false}) //After 1 second, set render to true
                }.bind(this), 2000)
            }
            this.props.createQuestion(res.data)
        });
    }

    SOQuery = (data) => {
        // this.setState({
        //                   relatedQuestions: {items: []}
        //               });
        if(data===""){
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
                    <div className={'col-md-8 '}>

                        <h3>Post your question here:</h3>
                        <div className={'container'}>
                            <div className="form-group row">
                                <label htmlFor="questionTitle"
                                       className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control"
                                           id="questionTitle"
                                           placeholder="Question Title"
                                           onChange={(e) => {
                                               this.setState({
                                                                 questionTitle: e.target.value
                                                             })

                                           }}
                                           value={this.state.questionTitle}
                                           onBlur={(e) => {
                                               this.SOQuery(e.target.value);
                                               console.log('onblur called')
                                           }}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="questionDesc"
                                       className="col-sm-2 col-form-label">Question
                                    Description</label>
                                <div className="col-sm-10">
                  <textarea type="text"
                            className="form-control"
                            id="questionDesc"
                            placeholder="provide details about the problem"

                            onChange={(e) => {
                                this.setState({
                                                  questionDescription: e.target.value
                                              })

                            }}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="offset-sm-2 col-sm-10">
                                    {this.renderQuestionPreview()}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Tags</label>
                                <div className="col-sm-10">
                                    <div className="form-inline">
                                        <label className="my-1 mr-2"
                                               htmlFor="searchTag">Search for other tags</label>
                                        <input type="text" id="searchTag"
                                               placeholder={'Enter tag names'}
                                               className={'form-control'}
                                               autoComplete="off"/>
                                    </div>
                                    <br/>

                                    <div className="btn-group-toggle" data-toggle="buttons">

                                        <label>Commonly used tags: &nbsp;</label>
                                        <label className="btn btn-outline-success btn-sm ">
                                            <input type="checkbox"
                                                   autoComplete="off"/> Checked1
                                        </label>

                                        <label className="btn btn-outline-success btn-sm ">
                                            <input type="checkbox"
                                                   autoComplete="off"/> Checked2
                                        </label>

                                        <label className="btn btn-outline-success btn-sm ">
                                            <input type="checkbox"
                                                   autoComplete="off"/> Checked3
                                        </label>
                                        <hr/>
                                        <label>Selected Tags:&nbsp;</label>
                                    </div>
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
                            <strong>Question was created successfully!!</strong>
                        </div>}
                    </div>
                    <div className={'col-md-4 '}>
                        <br/>
                        <h3>Related Questions</h3>
                        <table className={'table  table-striped table-bordered'}>

                            {this.state.relatedQuestions.items.slice(0, 5).map((item) => {
                                return (<tr>
                                    <td key={item.id}>
                                        {item.title}
                                    </td>
                                    <td>
                                        <a  target={'_blank'} className={'badge badge-pill badge-light'} href={item.link}>
                                        link
                                        </a>
                                    </td>
                                </tr>)
                            })}

                        </table>
                    </div>
                </div>

            </div>
        );
    }

    renderQuestionPreview() {
        if (Utils.isEmptyStr(this.state.questionDescription)) {
            return (<React.Fragment/>);
        }

        let markdown = markdownConvertor.makeHtml(this.state.questionDescription);
        return (
            <React.Fragment>
                <div className="font-weight-bold">Question Preview</div>
                <div dangerouslySetInnerHTML={{__html: markdown}} />
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
