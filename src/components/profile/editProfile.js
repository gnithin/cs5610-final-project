import React, {Component} from 'react';
import Utils from "../../common/utils";

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props);
    }

    getStateFromProps(props) {
        let user = props.user;
        if (Utils.isNull(user)) {
            user = {};
        }

        return {
            email: Utils.getVal(user.email),
            name: Utils.getVal(user.name)
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user) {
            this.setState({...this.getStateFromProps(this.props)});
        }
    }

    render() {
        let user = this.props.user;
        return (
            <div className="sidebar-wrapper">
                <div className="row">
                    <div className="col col-md-7">
                        <h2>Edit Profile</h2>
                    </div>
                </div>

                <div className="avatar-wrapper">
                    <div className="avatar" style={{backgroundColor: Utils.stringToColour(`${user.id}`)}}>
                    </div>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onSubmitCb({
                        ...this.state
                    });

                }}>
                    <div className="profile-entry">
                        <div className="profile-entry-header">
                            <i className="fa fa-user" aria-hidden="true"></i> &nbsp; Name
                        </div>
                        <div className="form-group profile-entry-content">
                            <input
                                type="string"
                                className="form-control"
                                placeholder="name"
                                value={this.state.name}
                                onChange={(e) => {
                                    this.setState({name: e.target.value});
                                }}
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="profile-entry">
                        <div className="profile-entry-header">
                            Email
                        </div>
                        <div className="form-group profile-entry-content">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="email"
                                value={this.state.email}
                                onChange={(e) => {
                                    this.setState({email: e.target.value});
                                }}
                                required={true}
                            />
                        </div>
                    </div>


                    <div className="profile-entry">
                        {this.renderErrMsg()}
                        <div className="form-group profile-entry-submit">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    renderErrMsg() {
        if (Utils.isEmptyStr(this.props.errorMsg)) {
            return (<React.Fragment/>);
        }
        return (
            <div className="alert alert-danger">
                {this.props.errorMsg}
            </div>
        );
    }
}

export default EditProfile;
