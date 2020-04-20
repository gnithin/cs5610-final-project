import React from 'react';
import {connect} from "react-redux";
import Utils from "../../../common/utils";
import './users.css'
import {Link} from "react-router-dom";

const UsersView = ({users, userSetAdminCb, userUnsetAdminCb, userDeleteCb}) => {
    const renderAdminControlForUser = (user) => {
        if (user.isAdmin) {
            return (
                <button
                    className="btn btn-warning"
                    onClick={() => {
                        userUnsetAdminCb(user.id);
                    }}
                >
                    Remove as Admin
                </button>
            );
        }
        return (
            <button
                className="btn btn-success"
                onClick={() => {
                    userSetAdminCb(user.id);
                }}
            >
                Add as Admin
            </button>
        );
    };


    return (
        <div className="au-users-wrapper">
            {users.map(user => {
                return (
                    <div className="card" key={`au-${user.id}`}>
                        <div className="card-body row">
                            <div className="col-8">
                                <h4 className="card-title">
                                    {user.name}
                                </h4>
                                <div>
                                    Email: {user.email}
                                </div>
                                <div>
                                    Member from - {Utils.formatDate(user.createdTimestamp)}
                                </div>
                                <div>
                                    <Link to={`/profiles/${user.id}`}
                                          target={"_blank"}
                                    >Profile</Link>
                                </div>
                            </div>

                            <div className="col-4 au-user-edit-tools">
                                <div className="au-user-edit-option">
                                    {renderAdminControlForUser(user)}
                                </div>
                                <div
                                    className="au-user-edit-option"
                                    onClick={() => {
                                        userDeleteCb(user.id);
                                    }}
                                >
                                    <button className="btn btn-danger">Remove user</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const reduxToComponentMapper = (state) => {
    return {
        users: state.adminUsers.users
    }
};

export default connect(reduxToComponentMapper)(UsersView);
