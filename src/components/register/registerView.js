import React, {Component} from 'react';
import '../createQuestion/createQuestionView.css'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import './registerStyle.css'
import registerService from "../../services/loginAndRegistrationService";
import userAction from "../../redux/actions/userProfileActions";

class RegisterView extends Component {
    state = {
        name: "",
        email: "",
        password: "",
    };

    registerMethod = () => {
        console.log(this.state.email, ' ', this.state.password, ' ', this.state.name);
        let obj = {
            "email": this.state.email,
            "password": this.state.password,
            "name": this.state.name,
        };

        registerService.registerService(obj).then(r => {
                console.log(r);
                if (r.status === 1) {
                    this.props.setUserData(r.data);
                    registerService.loginService({
                        email: this.state.email,
                        password: this.state.password
                    }).then(r => {
                        this.props.history.push('/home');
                    })
                }
            }
        )
    };

    render() {
        return (
            <div>
                {/*<NavBarComponent/>*/}

                <div id="logreg-forms">
                    <br/>
                    <div className="form-signin container">
                        <h1 className="h3 mb-3 font-weight-normal" style={{'textAlign': 'center'}}> Sign Up</h1>

                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                               required="" autoFocus="" style={{"textAlign": "center"}}
                               onChange={(e) => this.setState({email: e.target.value})}/>

                        <input type="text" id="inputFName" className="form-control" placeholder="Name"
                               required="" autoFocus="" style={{"textAlign": "center"}}
                               onChange={(e) => this.setState({name: e.target.value})}/>

                        <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                               required="" style={{"textAlign": "center"}}
                               onChange={(e) => this.setState({password: e.target.value})}/>

                        <input type="password" id="inputConfirmPassword" className="form-control"
                               placeholder="Confirm Password"
                               required="" style={{"textAlign": "center"}}/>

                        <br/>

                        <button className="btn btn-success btn-block" type="submit" onClick={this.registerMethod}><i
                            className="fas fa-sign-in-alt"/> &nbsp;
                            Register
                        </button>
                        <br/>
                        <button className="btn btn-primary btn-block" type="button" id="btn-signup"><Link to={'/login'}><i
                            className="fas fa-user-plus"/> &nbsp; Back to Login</Link>
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
        questionList: state.questionList
    }
};

const dispatchMapper = (dispatch) => {
    return {
        setUserData: (data) => {
            dispatch(userAction.setUserData(data))
        }
    }
};

export default connect(stateMapper, dispatchMapper)(RegisterView);
