import React, { useContext, useEffect } from 'react';
import AuthContext from '..//../context/auth/authContext';

const Bar = () => {

    // Get auth info
    const authContext = useContext(AuthContext);
    const { user, userAuth } = authContext;

    useEffect(() => {
        userAuth();
    }, []);

    return (
        <header className="app-header">
            { user && <p className="nombre-usuario">Hello, <span>{user.name}</span></p>}

            <nav className="nav-principal">
                <a href="#!">Log out</a>
            </nav>
        </header>
    );
}
 
export default Bar;