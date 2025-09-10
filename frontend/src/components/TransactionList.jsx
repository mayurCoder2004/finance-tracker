import React from 'react';
import TransactionItem from './TransactionItem';

export default function TransactionList({ transactions }) {
  if (!transactions || transactions.length === 0) return <div>No transactions yet</div>;
  return (
    <div style={{border:'1px solid #ddd',borderRadius:6,overflow:'hidden'}}>
      {transactions.map(tx => <TransactionItem key={tx._id} tx={tx} />)}
    </div>
  );
}
