import React from 'react';
import styles from './Home.module.css';
// COMPONENTS
import TransactionForm from './TransactionForm';
// HOOKS
import { useAuthContext } from '../../hooks/useAuthContext';

const Home = () => {
    // STATE
    const { user } = useAuthContext();

    return(
        <div className={styles.container}>
            <div className={styles.content}>

            </div>
            <div className={styles.sidebar}>
                <TransactionForm uid={user.uid}/>
            </div> 
        </div>
    );
}

export default Home;