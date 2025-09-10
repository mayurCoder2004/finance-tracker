import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api/transactions';
import TransactionList from '../components/TransactionList';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

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

  // Color palette for pie chart
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316', '#EC4899'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Page Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            💰 Financial Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            Track your income, expenses, and spending patterns
          </p>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Balance Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">Current Balance</p>
                <p className={`text-2xl sm:text-3xl font-bold ${
                  balance >= 0 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-orange-600 dark:text-orange-400'
                }`}>
                  ₹{balance.toLocaleString()}
                </p>
              </div>
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl ${
                balance >= 0 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                  : 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
              } group-hover:scale-110 transition-transform duration-300`}>
                {balance >= 0 ? '💰' : '⚠️'}
              </div>
            </div>
          </div>

          {/* Income Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">Total Income</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                  ₹{totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-xl sm:text-2xl text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                📈
              </div>
            </div>
          </div>

          {/* Expense Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 group sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">Total Expenses</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">
                  ₹{Math.abs(totalExpense).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center text-xl sm:text-2xl text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
                📉
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-12">
          {/* Transactions Section */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                📋 Recent Transactions
              </h2>
              {txs.length > 0 && (
                <div className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  {txs.length} transaction{txs.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
            <TransactionList transactions={txs} />
          </div>

          {/* Analytics Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                📊 Spending Analysis
              </h2>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                {pieData.length > 0 ? (
                  <div className="space-y-6">
                    {/* Chart Container */}
                    <div className="h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie 
                            data={pieData} 
                            dataKey="value" 
                            nameKey="name" 
                            cx="50%" 
                            cy="50%" 
                            outerRadius="80%"
                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Category Legend */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        Category Breakdown
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {pieData.map((category, index) => (
                          <div key={category.name} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              ></div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {category.name}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              ₹{category.value.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 sm:h-80 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      No data available
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Add some transactions to see your spending analysis
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}