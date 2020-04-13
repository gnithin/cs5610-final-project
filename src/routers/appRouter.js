import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import CreateQuestion from "../components/createQuestion";
import ViewQuestion from "../components/displayQuestionAnswer";
import Home from "../components/home";
import Login from "../components/login"
import Register from "../components/register"
import authenticateComponent from "./authenticateComponent";

class AppRouter extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/register"
                        component={Register}
                    />

                    <Route
                        path="/login"
                        component={Login}
                    />

                    <Route
                        path="/home"
                        component={authenticateComponent(Home)}
                    />

                    <Route
                        path="/create/question"
                        component={authenticateComponent(CreateQuestion)}
                    />

                    <Route
                        path="/question/:questionId"
                        render={(props) => <ViewQuestion {...props} />}
                        /*component={viewQuestion}*/
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
