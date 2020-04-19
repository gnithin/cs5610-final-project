import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import CreateQuestion from "../components/createQuestion";
import ViewQuestion from "../components/displayQuestionAnswer";
import Home from "../components/home";
import Login from "../components/login"
import Register from "../components/register"

import Profile from "../components/profile"

import authenticatedComponent from "./authenticatedComponent";
import WelcomeView from "../components/welcome";

class AppRouter extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/welcome"
                        component={WelcomeView}
                    />

                    <Route
                        path="/register"
                        component={Register}
                    />

                    <Route
                        path="/login"
                        component={Login}
                    />

                    <Route
                        path="/profiles/:userId"
                        component={Profile}
                    />

                    <Route
                        path="/home"
                        component={authenticatedComponent(Home)}
                    />

                    <Route
                        path="/create/questions"
                        component={authenticatedComponent(CreateQuestion)}
                    />

                    <Route
                        path="/questions/:questionId"
                        component={authenticatedComponent(ViewQuestion)}
                    />

                    <Route
                        exact
                        path="/"
                        render={() => {
                            return (<Redirect to="/welcome"/>);
                        }}
                    />

                    <Route
                        path="*"
                        render={() => {
                            return (<Redirect to="/home"/>);
                        }}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
