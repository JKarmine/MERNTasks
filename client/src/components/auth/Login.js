import React, { useState, useContext, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, auth, loginUser } = authContext;

    // If user auths or user doesn't exits
    useEffect(() => {
        if (auth) {
            props.history.push('/projects');
        }

        if (message) {
            showAlert(message.msg, message.category);
        }
        // eslint-disable-next-line
    }, [message, auth, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Validation empty spaces
        if (email.trim() === '' || password.trim() === '') {
            showAlert('All fields are required', 'alerta-error');
            return;
        }

        // Pass to action
        loginUser({ email, password });
    };

    return (
        <div className="form-usuario">
            { alert && <div className={`alerta ${alert.category}`}>{alert.msg}</div> }
            <div className="contenedor-form sombra-dark">
                <h1>Log in</h1>

                <form onSubmit={handleSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="email"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Log in"
                        />
                    </div>
                </form>
                <Link to="/register" className="enlace-cuenta">Create account</Link>
            </div>
        </div>
    );
}
 
export default Login;