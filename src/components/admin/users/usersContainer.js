import React, {Component} from 'react';
import UsersView from "./usersView";
import AdminUsersActions from "../../../redux/actions/adminUsersActions";
import {connect} from "react-redux";
import LoadingComponent from "../../loader";
import AdminUsersService from "../../../services/adminUsersService";
import NavBarComponent from "../../navbar/NavBarComponent";

class UsersContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
        }
    }

    componentDidMount() {
        this.fetchAllUsers();
    }

    render() {
        return (
            <React.Fragment>
                <NavBarComponent/>
                <div className="container-fluid">
                    {this.renderComponent()}
                </div>
            </React.Fragment>
        );
    }

    renderComponent() {
        if (this.state.isError) {
            return (
                <div className="row">
                    <div className="col-12 alert alert-danger" role="alert">
                        Error fetching users. Please try refreshing the page :(
                    </div>
                </div>
            );
        }

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
        this.setState({
            isLoading: true,
            isError: false,
        });
        AdminUsersService.fetchAllUsers().then(users => {
            this.props.setNewUsers(users);

        }).catch(e => {
            console.log("Couldn't fetch all the new users!", e.message);
            this.setState({isError: true});

        }).finally(() => {
            this.setState({isLoading: false});
        })
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
