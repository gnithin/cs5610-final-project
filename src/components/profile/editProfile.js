import React, {Component} from 'react';
import {Link} from "react-router-dom";

class EditProfile extends Component {
    renderUpdateStatusAlerts() {
        return (
            <React.Fragment>
                <div className="alert alert-danger mt-4" role="alert">
                    Alerts goes here
                </div>

                <div className="alert alert-success mt-4" role="status">
                    Status goes here
                </div>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className="col-12 col-lg-4 mx-auto">
                {this.renderUpdateStatusAlerts()}

                <div className={"mt-4"}>
                    {
                        typeof (this.state.userProfileData.name) !== "undefined"
                        &&
                        <div className="row form-group">
                            <div className="col-12">
                                <label htmlFor="name"
                                       className="col-form-label">Name</label>
                            </div>
                            <div className="col-12">
                                <input type="text"
                                       className="form-control"
                                       id="name"
                                       placeholder="Name - E.g. John Doe, Jane Doe"
                                       value={this.state.userProfileData.name} disabled/>
                            </div>
                        </div>
                    }

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

                    {
                        typeof (this.state.userProfileData.email) !== "undefined"
                        &&
                        <div className="row form-group">
                            <div className="col-12">
                                <label htmlFor="email"
                                       className="col-form-label">Email</label>
                            </div>
                            <div className="col-12">
                                <input type="email"
                                       className="form-control"
                                       id="email" autoComplete="off"
                                       value={this.state.userProfileData.email} disabled/>
                            </div>
                        </div>
                    }

                    {
                        typeof (this.state.userProfileData.totalReputation) !== "undefined"
                        &&
                        <div className="row form-group">
                            <div className="col-12">
                                <label htmlFor="reputation"
                                       className="col-form-label">Reputation</label>
                            </div>
                            <div className="col-12">
                                <input type="text"
                                       className="form-control"
                                       id="reputation" autoComplete="off"
                                       value={this.state.userProfileData.totalReputation} disabled/>
                            </div>
                        </div>
                    }

                    {
                        typeof (this.state.userProfileData.isAdmin) !== "undefined"
                        &&
                        <div className="row form-group">
                            <div className="col-12">
                                <label htmlFor="user-role"
                                       className="col-form-label">Role</label>
                            </div>
                            <div className="col-12">
                                <input type="user-role"
                                       className="form-control"
                                       id="user-role"
                                       placeholder="User Role"
                                       value={`${this.state.userProfileData.isAdmin ? "Admin" : "User"}`}
                                       disabled/>
                            </div>
                        </div>
                    }

                    <div className="row">
                        <div className="col form-group">
                            <button className="btn btn-success form-group" disabled>Update</button>
                            <Link className={"btn btn-danger form-group float-right disabled"} to={`/`}>
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProfile;
