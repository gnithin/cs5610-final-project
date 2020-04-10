import React, {Component} from 'react';
import '../createQuestion/createQuestionView.css'
import NavBarComponent from "../navbar/NavBarComponent";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class ProfileView extends Component {
    state = {
        questionList: []
    };

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <NavBarComponent/>

                <div className={"container-fluid"}>
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-4 mx-auto">
                            <div className="alert alert-danger mt-4" role="alert">
                                Alerts goes here
                            </div>

                            <div className="alert alert-success mt-4" role="status">
                                Status goes here
                            </div>

                            <div className={"mt-4"}>
                                <div className="row form-group">
                                    <div className="col-12">
                                        <label htmlFor="username"
                                               className="col-form-label">Username</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="text"
                                               className="form-control"
                                               id="username"
                                               placeholder="username - E.g. johndoe, janedoe" value="johndoe" disabled/>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-12">
                                        <label htmlFor="password"
                                               className="col-form-label">Password</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="password"
                                               className="form-control"
                                               id="password" autoComplete="off"/>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-12">
                                        <label htmlFor="confirm-password"
                                               className="col-form-label">Confirm Password</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="password"
                                               className="form-control"
                                               id="confirm-password" autoComplete="off"/>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-12">
                                        <label htmlFor="phone"
                                               className="col-form-label">Phone</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="text"
                                               className="form-control" placeholder="(123) 456-7890"
                                               id="phone" autoComplete="off" value="(123) 456-7890" required/>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-12">
                                        <label htmlFor="email"
                                               className="col-form-label">Email</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="email"
                                               className="form-control"
                                               id="email" autoComplete="off" value="john.doe@qwerty.com" required/>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-12">
                                        <label htmlFor="birth-date"
                                               className="col-form-label">Date of Birth</label>
                                    </div>
                                    <div className="col-12">
                                        <input type="date"
                                               className="form-control"
                                               id="birth-date" value="0001-01-01" autoComplete="off" required/>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-12">
                                        <label htmlFor="user-role"
                                               className="col-form-label">Role</label>
                                    </div>
                                    <div className="col-12">
                                        <select className="form-control" name="user-role"
                                                id="user-role">
                                            <option value="Faculty">Faculty</option>
                                            <option value="Student">Student</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col form-group">
                                        <button className="btn btn-success form-group">Update</button>
                                        <Link className={"btn btn-danger form-group float-right"} to={`/`}>
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8 mx-auto">
                            <div className={"container-fluid"}>
                                <div className={"row"}>
                                    <div className={"col-12"}>
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th scope="col"
                                                    className="d-flex justify-content-center">
                                                    All Questions
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className="pl-5 pt-4"><Link to={`/profile/:userId`}>My
                                                    Questions</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pl-5 pt-4"><Link to={`/profile/:userId`}>My
                                                    Questions</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pl-5 pt-4"><Link to={`/profile/:userId`}>My
                                                    Questions</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pl-5 pt-4"><Link to={`/profile/:userId`}>My
                                                    Questions</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pl-5 pt-4"><Link to={`/profile/:userId`}>My
                                                    Questions</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pl-5 pt-4"><Link to={`/profile/:userId`}>My
                                                    Questions</Link>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-12"}>
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th scope="col"
                                                    className="d-flex justify-content-center">
                                                    All Answers
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className="pl-5 pt-4"><Link to={`/profile/:userId`}>My
                                                    Answers</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pl-5 pt-4"><Link to={`/profile/:userId`}>My
                                                    Answers</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pl-5 pt-4"><Link to={`/profile/:userId`}>My
                                                    Answers</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pl-5 pt-4"><Link to={`/profile/:userId`}>My
                                                    Answers</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pl-5 pt-4"><Link to={`/profile/:userId`}>My
                                                    Answers</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pl-5 pt-4"><Link to={`/profile/:userId`}>My
                                                    Answers</Link>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
export default connect(stateMapper, dispatchMapper)(ProfileView);
