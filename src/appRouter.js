import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import CreateQuestion from "./components/createQuestion";
import Home from "./components/home";

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/create-question"
                        component={CreateQuestion}
                    />

                    <Route
                        path="/home"
                        component={Home}
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