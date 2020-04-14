import React, {Component} from 'react';
import '../createQuestion/createQuestionView.css'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import './registerStyle.css'
import registerService from "../../services/loginAndRegistrationService";
import userAction from "../../redux/actions/userProfileActions";

class RegisterView extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        showMessage: false,
        validationMessage: ""
    };

    componentDidMount() {
    }

    registerMethod = () => {
        console.log(this.state.email, ' ', this.state.password, ' ', this.state.firstName + this.state.lastName)
        let obj = {
            "email": this.state.email,
            "password": this.state.password,
            "name": this.state.firstName + " " + this.state.lastName

        }
        registerService.registerService(obj).then(r => {
                console.log(r)
                if (r.status === 1) {
                    this.props.setUserData(r.data);
                    registerService.loginService({
                        email: this.state.email,
                        password: this.state.password
                    }).then(r => {
                        this.props.history.push('/home');
                    })
                }
                // setTimeout(function () { //Start the timer
                //     this.setState({showMessage: false}) //After 1 second, set render to true
                // }.bind(this), 2000)
                console.log(r)

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

                        <input type="text" id="inputFName" className="form-control" placeholder="First Name"
                               required="" autoFocus="" style={{"textAlign": "center"}}
                               onChange={(e) => this.setState({firstName: e.target.value})}/>
                        <input type="text" id="inputLName" className="form-control" placeholder="Last Name"
                               required="" autoFocus="" style={{"textAlign": "center"}}
                               onChange={(e) => this.setState({lastName: e.target.value})}/>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                               required="" autoFocus="" style={{"textAlign": "center"}}
                               onChange={(e) => this.setState({email: e.target.value})}/>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                               required="" style={{"textAlign": "center"}}
                               onChange={(e) => this.setState({password: e.target.value})}/>
                        <input type="password" id="inputConfirmPassword" className="form-control"
                               placeholder="Confirm Password"
                               required="" style={{"textAlign": "center"}}/>

                        <button className="btn btn-success btn-block" type="submit" onClick={this.registerMethod}><i
                            className="fas fa-sign-in-alt"/> Sign up
                        </button>
                        <hr/>
                        <button className="btn btn-primary btn-block" type="button" id="btn-signup"><Link to={'/login'}><i
                            className="fas fa-user-plus"/> Back to Login</Link>
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
export default connect(stateMapper, dispatchMapper)(RegisterView);
