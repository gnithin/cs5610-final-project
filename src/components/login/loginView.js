import React, {Component} from 'react';
import '../createQuestion/createQuestionView.css'
import NavBarComponent from "../navbar/NavBarComponent";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import loginService from "../../services/loginAndRegistrationService";
import './loginStyle.css'
import userAction from '../../redux/actions/userProfileActions'
import Utils from "../../common/utils";

class LoginView extends Component {
    state = {
        email: "",
        password: "",
        errMsg: null,
    };

    loginMethod = () => {
        let obj = {
            "email": this.state.email,
            "password": this.state.password
        };
        loginService.loginService(obj).then(response => {
                if (response.ok) {
                    this.props.setUserData(response.data);
                    this.props.history.push('/home');
                } else {
                    let msg = "Error logging in. Please try again!";
                    console.log("Status - ", response);
                    if (response.responseCode >= 400 && response.responseCode < 500) {
                        msg = "Invalid username/password combination!"
                    }
                    throw new Error(msg);
                }
            }
        ).catch(e => {
            let msg = e.message;
            if (Utils.isEmptyStr(msg)) {
                msg = "Error logging in. Please try again!";
            }

            this.setState({errMsg: msg});
        })
    };

    renderErrMsg() {
        if (Utils.isEmptyStr(this.state.errMsg)) {
            return (<React.Fragment/>);
        }

        return (
            <div className="alert alert-danger" role="alert">
                {this.state.errMsg}
            </div>
        );
    }

    render() {
        return (
            <div>
                {
                    this.props.isLoggedIn
                    &&
                    <span>
                        <Redirect to={"/home"}/>
                    </span>
                }
                <NavBarComponent/>

                <div id="logreg-forms">
                    <br/>
                    {this.renderErrMsg()}
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
                        <br/>

                        <button className="btn btn-success btn-block" type="submit" onClick={this.loginMethod}><i
                            className="fas fa-sign-in-alt"/> &nbsp; Sign in
                        </button>

                        <br/>

                        <Link to={'/register'}>
                            <button className="btn btn-primary btn-block" type="button" id="btn-signup">
                                <i className="fas fa-user-plus"/> &nbsp;
                                Register
                            </button>
                        </Link>
                    </div>

                    <br/>

                </div>
            </div>
        );
    }
}

const stateMapper = (state) => {
    return {
        isLoggedIn: state.userProfile.isLoggedIn
    }
};

const dispatchMapper = (dispatch) => {
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
