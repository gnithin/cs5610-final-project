import React, {Component} from 'react';
import '../createQuestion/createQuestionView.css'
import NavBarComponent from "../navbar/NavBarComponent";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import loginService from "../../services/loginAndRegistrationService";
import './loginStyle.css'
import {Redirect} from 'react-router-dom'
import userAction from '../../redux/actions/userProfileActions'

class LoginView extends Component {
    state = {
        email: "",
        password: ""
    };

    componentDidMount() {

    }

    loginMethod = () => {
        console.log(this.state.email, ' ', this.state.password)
        let obj = {
            "email": this.state.email,
            "password": this.state.password
        }
        loginService.loginService(obj).then(r => {
                console.log(r)
                if (r.status === 1) {

                    this.props.setUserData(r.data)
                    this.props.history.push('/home');
                }
            }
        )
    }

    render() {
        return (
            <div>
                {/*<NavBarComponent/>*/}

                <div id="logreg-forms">
                    <br/>
                    <div className="form-signin container">
                        <h1 className="h3 mb-3 font-weight-normal" style={{'textAlign': 'center'}}> Sign in</h1>

                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                               required="" autoFocus="" onChange={(e) => {
                            this.setState({
                                email: e.target.value
                            })
                        }}/>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                               required="" onChange={(e) => {
                            this.setState({
                                password: e.target.value
                            })
                        }}/>

                        <button className="btn btn-success btn-block" type="submit" onClick={this.loginMethod}><i
                            className="fas fa-sign-in-alt"/> Sign in
                        </button>
                        <a href="#" id="forgot_pswd">Forgot password?</a><br/>
                        <hr/>
                        <button className="btn btn-primary btn-block" type="button" id="btn-signup"><Link
                            to={'/register'}><i
                            className="fas fa-user-plus"/> Sign up New Account</Link>
                        </button>
                    </div>


                    <br/>

                </div>
            </div>
        );
    }
}

const stateMapper = (state) => {
    console.log(state);
    return {

    }

};

const dispatchMapper = (dispatch) => {
    console.log("DEBUG: stateMapper in getAllQuestions called first");
    return {
        getAllQuestions: () => {
            dispatch()
        },
        setUserData: (data) => {
            dispatch(userAction.setUserData(data))
        }
    }

};
export default connect(stateMapper, dispatchMapper)(LoginView);
