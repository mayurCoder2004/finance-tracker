import React, { useEffect, useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import { getTransaction, updateTransaction } from '../api/transactions';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

export default function EditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    (async ()=>{
      try {
        const data = await getTransaction(id);
        setInitial({
          title: data.title,
          amount: data.amount,
          date: format(new Date(data.date),'yyyy-MM-dd'),
          category: data.category
        });
      } catch {
        alert('Failed to load');
      }
    })();
  }, [id]);

  const handleSubmit = async (form) => {
    try {
      await updateTransaction(id, form);
      nav('/');
    } catch {
      alert('Failed to update');
    }
  };

  return initial ? (
    <div>
      <h2>Edit Transaction</h2>
      <TransactionForm initial={initial} onSubmit={handleSubmit} submitLabel="Update"/>
    </div>
  ) : <div>Loading...</div>;
}
