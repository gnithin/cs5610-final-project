import React from 'react';
import {connect} from "react-redux";
import Utils from "../../../common/utils";

const UsersView = ({users}) => {
    return (
        <div className="au-users-wrapper">
            {users.map(user => {
                return (
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">
                                {user.name}
                            </h4>
                            <div>
                                Email: {user.email}
                            </div>
                            <div>
                                Member from - {Utils.formatDate(user.createdTimestamp)}
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
