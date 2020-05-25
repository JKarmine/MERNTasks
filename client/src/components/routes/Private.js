import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Private = ({ component: Component, ...props}) => {
    const authContext = useContext(AuthContext);
    const { auth } = authContext;

    return (
        <Route {...props} render={ props => !auth ? <Redirect to="/" /> : <Component {...props} /> } />
    );
}
 
export default Private;