import React, { useState } from 'react';

const TransactionForm = () => {
    // STATE
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    // EVENT HANDLERS
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, amount);
    }
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