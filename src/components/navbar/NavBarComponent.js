import React, {Component} from 'react';
import './navBarStyle.css'
import {Link, Redirect} from "react-router-dom";
import loginService from '../../services/loginAndRegistrationService'

class NavBarComponent extends Component {
    logout = () => {
        loginService.logoutService().then(r => {

        })
        return (
            <Redirect to={{
                pathname: '/login',
            }}/>
        );
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="navbar-brand titleStyle">
                    <Link
                        title="Chowk"
                        to={`/home`}
                    >
                        Chowk
                    </Link>
                </div>

                <div className="navbar-nav ml-auto nav-right my-2 my-lg-0">
                    <Link
                        className="btn btn-primary"
                        title="Create Question"
                        to={`/create/question`}
                    >
                        Create Question
                    </Link>

                    <button
                        className="btn btn-danger ml-3"
                        onClick={this.logout}
                    >
                        Logout
                    </button>

                </div>
                {/*<button className="navbar-toggler" type="button" data-toggle="collapse"*/}
                {/*        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"*/}
                {/*        aria-expanded="false" aria-label="Toggle navigation">*/}
                {/*    <span className="navbar-toggler-icon"></span>*/}
                {/*</button>*/}

                {/*<div className="collapse navbar-collapse nav-right " id="navbarSupportedContent">*/}
                {/*    <ul className="navbar-nav mr-auto ">*/}
                {/*        <li className="nav-item active">*/}
                {/*            <a className="nav-link" href="#">Home <span*/}
                {/*                className="sr-only">(current)</span></a>*/}
                {/*        </li>*/}
                {/*        <li className="nav-item">*/}
                {/*            <a className="nav-link" href="#">Link</a>*/}
                {/*        </li>*/}
                {/*        <li className="nav-item dropdown">*/}
                {/*            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"*/}
                {/*               role="button" data-toggle="dropdown" aria-haspopup="true"*/}
                {/*               aria-expanded="false">*/}
                {/*                Dropdown*/}
                {/*            </a>*/}
                {/*            <div className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
                {/*                <a className="dropdown-item" href="#">Action</a>*/}
                {/*                <a className="dropdown-item" href="#">Another action</a>*/}
                {/*                <div className="dropdown-divider"></div>*/}
                {/*                <a className="dropdown-item" href="#">Something else here</a>*/}
                {/*            </div>*/}
                {/*        </li>*/}
                {/*        <li className="nav-item">*/}
                {/*            <a className="nav-link disabled" href="#" tabIndex="-1"*/}
                {/*               aria-disabled="true">Disabled</a>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*    <div className="form-inline my-2 my-lg-0">*/}
                {/*        <input className="form-control mr-sm-2" type="search" placeholder="Search"*/}
                {/*               aria-label="Search"/>*/}
                {/*        <button className="btn btn-outline-success my-2 my-sm-0"*/}
                {/*                type="submit">Search*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </nav>

        );
    }
}

export default NavBarComponent;
