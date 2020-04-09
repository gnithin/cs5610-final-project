import React, {Component} from 'react';
import '../createQuestion/createQuestionView.css'
import NavBarComponent from "../navbar/NavBarComponent";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import questionService from "../../services/questionService";
import './loginStyle.css'
class LoginView extends Component {
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
                {/*<NavBarComponent/>*/}

                <div id="logreg-forms">
                    <form className="form-signin">
                        <h1 className="h3 mb-3 font-weight-normal" style={{'text-align':'center'}}> Sign in</h1>

                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                               required="" autoFocus=""/>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                                   required=""/>

                                <button className="btn btn-success btn-block" type="submit"><i
                                    className="fas fa-sign-in-alt"/> Sign in
                                </button>
                                <a href="#" id="forgot_pswd">Forgot password?</a><br/>
                                <hr/>
                                    <button className="btn btn-primary btn-block" type="button" id="btn-signup"><Link to={'/register'}><i
                                        className="fas fa-user-plus"/> Sign up New Account</Link>
                                    </button>
                    </form>

                    <form action="/reset/password/" className="form-reset">
                        <input type="email" id="resetEmail" className="form-control" placeholder="Email address"
                               required="" autoFocus=""/>
                            <button className="btn btn-primary btn-block" type="submit">Reset Password</button>
                            <a href="#" id="cancel_reset"><i className="fas fa-angle-left"/> Back</a>
                    </form>

                    <form action="/signup/" className="form-signup">
                        <div className="social-login">
                            <button className="btn facebook-btn social-btn" type="button"><span><i
                                className="fab fa-facebook-f"/> Sign up with Facebook</span></button>
                        </div>
                        <div className="social-login">
                            <button className="btn google-btn social-btn" type="button"><span><i
                                className="fab fa-google-plus-g"/> Sign up with Google+</span></button>
                        </div>

                        <p style={{'text-align':'center'}}>OR</p>

                        <input type="text" id="user-name" className="form-control" placeholder="Full name" required=""
                               autoFocus=""/>
                            <input type="email" id="user-email" className="form-control" placeholder="Email address"
                                   required autoFocus=""/>
                                <input type="password" id="user-pass" className="form-control" placeholder="Password"
                                       required autoFocus=""/>
                                    <input type="password" id="user-repeatpass" className="form-control"
                                           placeholder="Repeat Password" required autoFocus=""/>

                                        <button className="btn btn-primary btn-block" type="submit"><i
                                            className="fas fa-user-plus"/> Sign Up
                                        </button>
                                        <a href="#" id="cancel_signup"><i className="fas fa-angle-left"/> Back</a>
                    </form>
                    <br/>

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
export default connect(stateMapper, dispatchMapper)(LoginView);
