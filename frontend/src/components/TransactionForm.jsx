import React, { useState } from 'react';
import { format } from 'date-fns';

export default function TransactionForm({ initial = { title:'', amount:0, date: format(new Date(), 'yyyy-MM-dd'), category:'' }, onSubmit, submitLabel='Save' }) {
  const [form, setForm] = useState(initial);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.date || !form.category) {
      return alert('Please fill all fields');
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:600}}>
      <div>
        <label>Title</label><br/>
        <input name="title" value={form.title} onChange={handleChange} required/>
      </div>
      <div>
        <label>Amount (use negative for expense)</label><br/>
        <input name="amount" type="number" value={form.amount} onChange={handleChange} required/>
      </div>
      <div>
        <label>Date</label><br/>
        <input name="date" type="date" value={form.date} onChange={handleChange} required/>
      </div>
      <div>
        <label>Category</label><br/>
        <input name="category" value={form.category} onChange={handleChange} required/>
      </div>
      <div style={{marginTop:8}}>
        <button type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}
