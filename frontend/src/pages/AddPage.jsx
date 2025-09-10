import React from 'react';
import TransactionForm from '../components/TransactionForm';
import { createTransaction } from '../api/transactions';
import { useNavigate } from 'react-router-dom';

export default function AddPage() {
  const nav = useNavigate();
  const handleSubmit = async (data) => {
    try {
      await createTransaction(data);
      nav('/');
    } catch (err) {
      alert('Failed to add');
    }
  };
  return (
    <div>
      <h2>Add Transaction</h2>
      <TransactionForm onSubmit={handleSubmit} submitLabel="Add Transaction" />
    </div>
  );
}
