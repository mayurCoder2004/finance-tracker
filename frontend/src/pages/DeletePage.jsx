import React, { useEffect, useState } from 'react';
import { getTransaction, deleteTransaction } from '../api/transactions';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function DeletePage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [tx, setTx] = useState(null);

  useEffect(() => {
    (async ()=>{
      try {
        const data = await getTransaction(id);
        setTx(data);
      } catch {
        alert('Failed to load');
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this transaction?')) return;
    try {
      await deleteTransaction(id);
      nav('/');
    } catch {
      alert('Failed to delete');
    }
  };

  if (!tx) return <div>Loading...</div>;
  return (
    <div>
      <h2>Delete Transaction</h2>
      <div>
        <p><strong>{tx.title}</strong></p>
        <p>Amount: {tx.amount}</p>
        <p>Category: {tx.category}</p>
        <p>Date: {format(new Date(tx.date),'PPP')}</p>
      </div>
      <div style={{marginTop:8}}>
        <button onClick={handleDelete} style={{background:'red',color:'#fff'}}>Confirm Delete</button>
        <Link to="/" style={{marginLeft:8}}>Cancel</Link>
      </div>
    </div>
  );
}
