import React, {Component} from 'react';
import NavBarComponent from "../navbar/NavBarComponent";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import profileService from "../../services/profileService";
import loginService from "../../services/loginAndRegistrationService";
import userAction from "../../redux/actions/userProfileActions";
import './profile.css'

class ProfileView extends Component {
    state = {
        userProfileData: {}
    };

    componentDidMount() {
        loginService.currentLoggedInService().then(response => {
            if (response.status === 1) {
                this.props.setIsLogin(true, response.data);
            } else {
                this.props.setIsLogin(false, {});
            }
        });

        profileService.getUserProfileData(this.props.match.params.userId).then(
            userProfileData => {
                if (userProfileData.status === 1) {
                    this.setState({
                        userProfileData: userProfileData.data
                    });
                } else {
                    this.props.history.push("/home");
                }
            }
        );
    }

    render() {
        return (
            <React.Fragment>
                <NavBarComponent/>

                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-8 mx-auto">
                            <div>
                                <div className={"row"}>
                                    <div className={"col-12"}>
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th scope="col"
                                                    className="d-flex justify-content-center">
                                                    All Questions Asked
                                                </th>
                                            </tr>
                                            </thead>
                                            {
                                                this.state.userProfileData.questions
                                                &&
                                                <tbody>
                                                {
                                                    this.state.userProfileData.questions.map((eachQuestion, index) => {
                                                        if (index < 6) {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="pl-5 pt-4">
                                                                        <Link to={`/profile/:userId`}>
                                                                            {eachQuestion.title}
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                        return null;
                                                    })
                                                }
                                                </tbody>
                                            }
                                            {
                                                (typeof (this.state.userProfileData.questions) === "undefined" || this.state.userProfileData.questions.length <= 0)
                                                &&
                                                <tbody>
                                                <tr>
                                                    <td className="pl-5 pt-4"/>
                                                </tr>
                                                <tr>
                                                    <td className="pl-5 pt-4"/>
                                                </tr>
                                                <tr>
                                                    <td className="pl-5 pt-4"/>
                                                </tr>
                                                <tr>
                                                    <td className="pl-5 pt-4"/>
                                                </tr>
                                                <tr>
                                                    <td className="pl-5 pt-4"/>
                                                </tr>
                                                </tbody>
                                            }
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
                                                    All Questions Answered
                                                </th>
                                            </tr>
                                            </thead>
                                            {
                                                this.state.userProfileData.answers
                                                &&
                                                <tbody>
                                                {
                                                    this.state.userProfileData.answers.map((eachAnswer, index) => {
                                                        if (index < 6) {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="pl-5 pt-4">
                                                                        <Link to={`/profile/:userId`}>
                                                                            {eachAnswer.answer}
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                        return null;
                                                    })
                                                }
                                                </tbody>
                                            }
                                            {
                                                (typeof (this.state.userProfileData.answers) === "undefined" || this.state.userProfileData.answers.length <= 0)
                                                &&
                                                <tbody>
                                                <tr>
                                                    <td className="pl-5 pt-4"/>
                                                </tr>
                                                <tr>
                                                    <td className="pl-5 pt-4"/>
                                                </tr>
                                                <tr>
                                                    <td className="pl-5 pt-4"/>
                                                </tr>
                                                <tr>
                                                    <td className="pl-5 pt-4"/>
                                                </tr>
                                                <tr>
                                                    <td className="pl-5 pt-4"/>
                                                </tr>
                                                </tbody>
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

const stateMapper = (state) => {
    return {
        userProfileData: state.userProfile.userProfileData
    }

};

const dispatchMapper = (dispatch) => {
    return {
        setIsLogin: (loginStatus, userData) => {
            dispatch(userAction.setIsLogin(loginStatus, userData))
        }
    }

};
export default connect(stateMapper, dispatchMapper)(ProfileView);
