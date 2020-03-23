import React, {Component} from 'react';
import {connect} from "react-redux";
import NavBarComponent from "../navbar/NavBarComponent";

class displayQuestionAnswerView extends Component {
  render() {
    return (
        <div className={''}>
          <NavBarComponent/>

          <div className={'row container-fluid'}>
            <div className={'col-md-8 '}>
              <div className={'container mt-5'}>

                <div className="form-group row">
                  <label htmlFor="questionTitle"
                         className="col-sm-2 col-form-label">Question</label>
                  <div className="form-control col-sm-10" id={'questionTitle'}>
                    "PLACE: DATA"
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="questionDesc"
                         className="col-sm-2 col-form-label">Question
                    Description</label>
                  <div className="form-control col-sm-10" id="questionDesc">
                    "PLACE: DATA"
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Selected
                    Tags</label>
                  <div className="col-sm-10">
                    PLACE: LOOP THROUGH TAGS
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Answer to the
                    Question</label>
                  <div className="col-sm-10">
                    <span>PLACE: ACTUAL ANSWER</span>
                    <div>
                      <i className="fas fa-thumbs-up p-5"></i>
                      <span>
                        "PLACE: COUNT"
                      </span>
                      <i className="fas fa-thumbs-down p-5"></i>
                    </div>
                    <span>PLACE: ACTUAL ANSWER</span>
                    <div>
                      <i className="fas fa-thumbs-up text-success p-5"></i>
                      <span>
                        "PLACE: COUNT"
                      </span>
                      <i className="fas fa-thumbs-down p-5"></i>
                    </div>
                    <span>PLACE: ACTUAL ANSWER</span>
                    <div>
                      <i className="fas fa-thumbs-up p-5"></i>
                      <span>
                        "PLACE: COUNT"
                      </span>
                      <i className="fas fa-thumbs-down text-danger p-5"></i>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className={'col-md-4'}>
              <div className={'mt-5'}>
                <div className="col-sm-12">
                  Similar Questions which might be helpful:
                  <div className={'mt-4'}>
                    PLACE: LOOP THROUGH STACK OVERFLOW LINKS
                  </div>
                  <div className={'mt-4'}>
                    PLACE: LOOP THROUGH STACK OVERFLOW LINKS
                  </div>
                  <div className={'mt-4'}>
                    PLACE: LOOP THROUGH STACK OVERFLOW LINKS
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
    );
  }

}

const stateMapper = () => {
  console.log("DEBUG: stateMapper in CreateQuestionView called first")
  return {}
};

const dispatchMapper = (dispatch) => {

  return {}
};
export default connect(stateMapper)(displayQuestionAnswerView);