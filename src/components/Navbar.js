import React from 'react';
import styles from './Navbar.module.css';
// ROUTER
import { Link } from 'react-router-dom';
// HOOKS
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    // STATE
    const { logout } = useLogout();
    const { user } = useAuthContext();

    return(
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>
                    myMoney
                </li>
                
                {!user && (
                    <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup'>Signup</Link></li>
                    </>
                )}

                {user && (
                    <>
                        <li>Hello, {user.displayName}</li>
                        <li>
                            <button className='btn' onClick={logout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;