import React, {Component} from 'react';
import UsersView from "./usersView";
import AdminUsersActions from "../../../redux/actions/adminUsersActions";
import {connect} from "react-redux";
import LoadingComponent from "../../loader";

class UsersContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        this.fetchAllUsers();
    }

    render() {
        if (this.state.isLoading) {
            return (<LoadingComponent/>);
        }

        return (
            <UsersView
                userDeleteCb={this.userDeleteHandler.bind(this)}
                userSetAdminCb={this.userSetAdminHandler.bind(this)}
                userUnsetAdminCb={this.userUnsetAdminHandler.bind(this)}
            />
        );
    }

    fetchAllUsers() {
        this.setState({isLoading: true});
        // TODO: Logic
    }

    userDeleteHandler(userId) {

    }

    userSetAdminHandler(userId) {

    }

    userUnsetAdminHandler(userId) {

    }
}

const reduxToComponentMapper = (state) => {
    return {
        users: state.adminUsers.users
    }
};

const componentToReduxMapper = (dispatch) => {
    return {
        setNewUsers: (users) => {
            return dispatch(AdminUsersActions.setUsers(users));
        }
    };
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(UsersContainer);
