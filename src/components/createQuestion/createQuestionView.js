import React, { Component } from 'react';
import { connect } from "react-redux";
import NavBarComponent from "../navbar/NavBarComponent";

class CreateQuestionView extends Component {
  render() {
    return (
      <div className={''}>
        <NavBarComponent />
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
                    placeholder="Question Title" />
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
                    placeholder="provide details about the problem" />
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
                      autoComplete="off" />
                  </div>
                  <br />

                  <div className="btn-group-toggle" data-toggle="buttons">

                    <label>Commonly used tags: &nbsp;</label>
                    <label className="btn btn-outline-success btn-sm ">
                      <input type="checkbox"
                        autoComplete="off" /> Checked1
                      </label>

                    <label className="btn btn-outline-success btn-sm ">
                      <input type="checkbox"
                        autoComplete="off" /> Checked2
                      </label>

                    <label className="btn btn-outline-success btn-sm ">
                      <input type="checkbox"
                        autoComplete="off" /> Checked3
                      </label>
                    <hr />
                    <label>Selected Tags:&nbsp;</label>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary">Post
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div className={'col-md-4 '}>
            <br />
            <div className="card" style={{ "width": "30rem" }}>
              <img src="http://via.placeholder.com/640x360"
                className="card-img-top profileImageSize" alt="..." />
              <div className="card-body">
                <h5 className="card-title">User Name</h5>
                <p className="card-text">Sample text here </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Reputation</li>
                <li className="list-group-item">Questions asked</li>
                <li className="list-group-item">Questions answered</li>
              </ul>
              <div className="card-body">
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
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
export default connect(stateMapper)(CreateQuestionView);