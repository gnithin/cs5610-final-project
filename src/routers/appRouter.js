import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import CreateQuestion from "../components/createQuestion";
import ViewQuestion from "../components/displayQuestionAnswer";
import Home from "../components/home";
import Login from "../components/login"
import Register from "../components/register"

import Profile from "../components/profile"

import authenticateComponent from "./authenticateComponent";
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
                        component={authenticateComponent(Home)}
                    />

                    <Route
                        path="/create/questions"
                        component={authenticateComponent(CreateQuestion)}
                    />

                    <Route
                        path="/questions/:questionId"
                        component={authenticateComponent(ViewQuestion)}
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
