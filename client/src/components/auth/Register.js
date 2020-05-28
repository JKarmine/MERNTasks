import React, { useState, useContext, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, auth, registerUser } = authContext;

    // If user auths or user duplicated
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
        name: '',
        email: '',
        password: '',
        confirm: ''
    });

    const { name, email, password, confirm } = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Validation
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === '') {
            showAlert('All fields are required', 'alerta-error');
            return;
        }

        // Password with 6 characters min
        if(password.length < 6) {
            showAlert('Password must have at least six characters', 'alerta-error');
            return;
        }

        // Two passwords must be the same
        if (password !== confirm) {
            showAlert('The passwords must be the same', 'alerta-error');
        }

        // Pass to action
        registerUser({
            name,
            email,
            password
        });
    };

    return (
        <div className="form-usuario">
            { alert && <div className={`alerta ${alert.category}`}>{alert.msg}</div> }
            <div className="contenedor-form sombra-dark">
                <h1>Create account</h1>

                <form onSubmit={handleSubmit}>
                    <div className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={handleChange}
                        />
                    </div>
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
                        <label htmlFor="confirm">Confirm password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Confirm password"
                            value={confirm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Register"
                        />
                    </div>
                </form>
                <Link to="/" className="enlace-cuenta">Log In</Link>
            </div>
        </div>
    );
}
 
export default Register;