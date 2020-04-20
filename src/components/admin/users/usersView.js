import React from 'react';
import {connect} from "react-redux";

const UsersView = ({users}) => {
    return (
        <ul>
            {users.map(user => {
                return <li>
                    {user.name}
                </li>
            })}
        </ul>
    );
};

const reduxToComponentMapper = (state) => {
    return {
        users: state.adminUsers.users
    }
};

export default connect(reduxToComponentMapper)(UsersView);
