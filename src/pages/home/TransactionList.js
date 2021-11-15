import React from 'react';
import styles from './Home.module.css';
// FIREBASE
import { useFirestore } from '../../hooks/useFirestore';

const TransactionList = ({transactions}) => {
    //STATE
    const { deleteDocument } = useFirestore('transactions');

    // EVENT HANDLERS
    return(
        <ul className={styles.transaction}>
            {transactions && transactions.map((transaction) => (
                <li key={transaction.id}>
                    <p className={styles.name}>{transaction.name}</p>
                    <p className={styles.amount}>${transaction.amount}</p>
                    <button onClick={() => deleteDocument(transaction.id)}>X</button>
                </li>
            ))}
        </ul>
    );
}

export default TransactionList;