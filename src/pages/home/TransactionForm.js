import React, { useState, useEffect } from 'react';
// HOOKS 
import { useFirestore } from '../../hooks/useFirestore';

const TransactionForm = ({uid}) => {
    // STATE
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const { addDocument, response } = useFirestore('transactions');

    // EVENT HANDLERS
    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument({
            uid : uid,
            name : name,
            amount : amount
        })
    }

    // useEFFECT
    useEffect(() => {
        if(response.success){
            setName('');
            setAmount('');
        }
    }, [response.success]);

    return(
        <>
            <h3>Add A Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction Name:</span>
                    <input
                        type='text'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input
                        type='number'
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>
                <button className='btn'>Add Transaction</button>
            </form>
        </>
    );
}

export default TransactionForm;