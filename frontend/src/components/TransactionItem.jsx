import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function TransactionItem({ tx }) {
  const isIncome = tx.amount >= 0;
  return (
    <div style={{display:'flex',justifyContent:'space-between',padding:8,borderBottom:'1px solid #eee'}}>
      <div>
        <div style={{fontWeight:600}}>{tx.title}</div>
        <div style={{fontSize:12,color:'#666'}}>{tx.category} • {format(new Date(tx.date), 'PP')}</div>
      </div>
      <div style={{textAlign:'right'}}>
        <div style={{color: isIncome ? 'green' : 'red', fontWeight:700}}>
          {isIncome ? `+₹${Math.abs(tx.amount)}` : `-₹${Math.abs(tx.amount)}`}
        </div>
        <div style={{marginTop:6}}>
          <Link to={`/${tx._id}/edit`} style={{marginRight:8}}>Edit</Link>
          <Link to={`/${tx._id}/delete`} style={{color:'red'}}>Delete</Link>
        </div>
      </div>
    </div>
  );
}
