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
import unauthenticatedComponent from "./unauthenticatedComponent";
import AnyAuthComponent from "./anyAuthComponent";

class AppRouter extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/welcome"
                        component={AnyAuthComponent(WelcomeView)}
                    />

                    <Route
                        path="/register"
                        component={unauthenticatedComponent(Register)}
                    />

                    <Route
                        path="/login"
                        component={unauthenticatedComponent(Login)}
                    />

                    <Route
                        path="/profiles/:userId"
                        component={AnyAuthComponent(Profile)}
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
