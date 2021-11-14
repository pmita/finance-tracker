import React, { useState } from 'react';
import styles from './Login.module.css';
// HOOKS
import { useLogin } from '../../hooks/useLogin';

const Login = () => {
    // STATE
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isPending } = useLogin();

    // EVENT HANDLERS
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email,password);
        login(email, password);
    }
    return(
        <form className={styles['login-form']} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                <span>Email:</span>
                <input 
                    type='email' 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input 
                    type='password' 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {!isPending && <button className='btn'>Login</button>}
            {isPending && <button className='btn' disabled>Loading...</button>}

            {error && <p className='error'>{error}</p>}
        </form>
    );
}

export default Login;