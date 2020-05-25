import React, { useContext, useEffect } from 'react';
import AuthContext from '..//../context/auth/authContext';

const Bar = () => {

    // Get auth info
    const authContext = useContext(AuthContext);
    const { user, userAuth, logoutUser } = authContext;

    useEffect(() => {
        userAuth();
    }, []);

    return (
        <header className="app-header">
            { user && <p className="nombre-usuario">Hello, <span>{user.name}</span></p>}

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => logoutUser()}
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
}
 
export default Bar;