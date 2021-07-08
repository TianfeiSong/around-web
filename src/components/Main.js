import React from 'react';
import {Redirect, Route, Switch} from "react-router";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { useSelector } from "react-redux";

function Main() {
    const isLoggedIn = useSelector(state => state.loginStatus.isLoggedIn);

    const showLogin = () => {
        return isLoggedIn ? (
            <Redirect to="/home" />
        ) : (
            <Login />
        );
    };

    const showHome = () => {
        return isLoggedIn ? <Home /> : <Redirect to="/login" />
    };
    return (
        <div className="main">
            <Switch>
                <Route path="/" exact render={showLogin} />
                <Route path="/login" render={showLogin} />
                <Route path="/register" component={Register} />
                <Route path="/home" render={showHome} />
            </Switch>
        </div>
    );
}

export default Main;