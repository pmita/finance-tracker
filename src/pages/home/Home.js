import React from 'react';
import styles from './Home.module.css';
// COMPONENTS
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
// HOOKS
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

const Home = () => {
    // STATE
    const { user } = useAuthContext();
    const { documents, error } = useCollection(
        'transactions',
        ['uid', '==', user.uid]
        );

    return(
        <div className={styles.container}>
            <div className={styles.content}>
                {error && <p>{error}</p>}
                {documents && <TransactionList transactions={documents}/>}
            </div>
            <div className={styles.sidebar}>
                <TransactionForm uid={user.uid}/>
            </div> 
        </div>
    );
}

export default Home;