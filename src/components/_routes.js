import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "../components/register";
import Login from "../components/login";
import CriminalCode from "../components/CriminalCode";
import Status from "../components/Status";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={["/", "/register"]} component={Register} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/status" component={Status} />
                <Route path="/criminalcode" component={CriminalCode} />
            </Switch>
        </Router>
    );
};

export default Routes;