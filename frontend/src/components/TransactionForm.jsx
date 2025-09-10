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
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 space-y-6 border border-gray-200 dark:border-gray-700"
      >
        {/* Form Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            💰 Transaction Details
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Fill in the information below</p>
        </div>

        {/* Title Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            📝 Transaction Title
          </label>
          <input 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
            required
            placeholder="e.g., Coffee, Salary, Groceries"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 placeholder-gray-400"
          />
        </div>

        {/* Amount Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            💵 Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">₹</span>
            <input 
              name="amount" 
              type="number" 
              value={form.amount} 
              onChange={handleChange} 
              required
              step="0.01"
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 placeholder-gray-400"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            💡 Use negative values for expenses (e.g., -25.50)
          </p>
        </div>

        {/* Date and Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Date Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              📅 Date
            </label>
            <input 
              name="date" 
              type="date" 
              value={form.date} 
              onChange={handleChange} 
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            />
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              🏷️ Category
            </label>
            <input 
              name="category" 
              value={form.category} 
              onChange={handleChange} 
              required
              placeholder="e.g., Food, Income, Transport"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button 
            type="submit"
            className="w-full sm:w-auto sm:min-w-[200px] px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="flex items-center justify-center gap-2">
              ✨ {submitLabel}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}