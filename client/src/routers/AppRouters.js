import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { HomeScreen } from '../components/HomeScreen';
import { RegisterScreen } from '../components/RegisterScreen';

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route
                    exact path="/"
                    component={HomeScreen}
                />
                <Route
                    exact path="/register"
                    component={RegisterScreen}
                />

            </Switch>
        </Router>
    )
}