import React, {Component, Profiler} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import CreateQuestion from "../components/createQuestion";
import ViewQuestion from "../components/displayQuestionAnswer";
import Home from "../components/home";
import Login from "../components/login"
import Register from "../components/register"
import Profile from "../components/profile"
class AppRouter extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/home"
                        component={Home}
                    />
                    <Route
                        path="/login"
                        component={Login}
                    />

                    <Route
                        path="/profile/:userId"
                        component={Profile}
                    />

                    <Route
                        path="/register"
                        component={Register}
                    />

                    <Route
                        path="/create/question"
                        component={CreateQuestion}
                    />

                    <Route
                        path="/question/:questionId"
                        component={ViewQuestion}
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
