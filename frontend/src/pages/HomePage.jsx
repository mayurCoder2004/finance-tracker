import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api/transactions';
import TransactionList from '../components/TransactionList';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

export default function HomePage() {
  const [txs, setTxs] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetch();
  }, [filters]);

  const fetch = async () => {
    try {
      const data = await getTransactions(filters);
      setTxs(data);
    } catch (err) {
      alert('Failed to load transactions');
    }
  };

  const totalIncome = txs.filter(t => t.amount>=0).reduce((s,t)=>s+t.amount,0);
  const totalExpense = txs.filter(t => t.amount<0).reduce((s,t)=>s+t.amount,0);
  const balance = totalIncome + totalExpense;

  // simple category summary for pie chart
  const catMap = {};
  txs.forEach(t => {
    catMap[t.category] = (catMap[t.category] || 0) + Math.abs(t.amount);
  });
  const pieData = Object.entries(catMap).map(([name, value]) => ({ name, value }));

  return (
    <div>
      <h2>Overview</h2>
      <div style={{display:'flex',gap:12,marginBottom:10}}>
        <div>Balance: <strong>₹{balance}</strong></div>
        <div>Income: <strong style={{color:'green'}}>₹{totalIncome}</strong></div>
        <div>Expense: <strong style={{color:'red'}}>₹{Math.abs(totalExpense)}</strong></div>
      </div>

      <div style={{display:'flex',gap:20}}>
        <div style={{flex:1}}>
          <h3>Transactions</h3>
          <TransactionList transactions={txs} />
        </div>

        <div style={{width:300}}>
          <h3>Spending by Category</h3>
          {pieData.length ? (
            <PieChart width={300} height={300}>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label/>
              <Tooltip/>
            </PieChart>
          ) : <div>No data</div>}
        </div>
      </div>
    </div>
  );
}
