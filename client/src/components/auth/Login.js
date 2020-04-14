import React, { useState }  from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
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

        // Validation

        // Pass to action

    };

    return (
        <div className="form-usuario">
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