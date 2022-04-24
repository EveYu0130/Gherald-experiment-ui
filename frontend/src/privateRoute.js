import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Auth } from "./auth";


const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest}
            render={({ location }) => (
                Auth.isAuthenticated ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}/>
                )
            )}
        />
    );
};

export default PrivateRoute;