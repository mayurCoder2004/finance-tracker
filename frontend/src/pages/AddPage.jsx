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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8 text-sm sm:text-base">
          <button 
            onClick={() => nav('/')}
            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 font-medium"
          >
            ← Back to Dashboard
          </button>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 dark:text-gray-400">Add Transaction</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900 dark:to-blue-900 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl sm:text-4xl">💰</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ➕ Add New Transaction
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Record your income or expenses to keep track of your financial activities
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          {/* Form Container */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 px-6 py-4 sm:py-6">
              <div className="flex items-center gap-3 text-white">
                <span className="text-2xl">📝</span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Transaction Information
                  </h2>
                  <p className="text-emerald-100 text-sm sm:text-base mt-1">
                    Fill in the details below to add your transaction
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8">
              <TransactionForm 
                onSubmit={handleSubmit} 
                submitLabel="Add Transaction" 
              />
            </div>
          </div>

          {/* Helper Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Income Tip */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-200 dark:bg-green-700 rounded-full flex items-center justify-center">
                  <span className="text-lg">📈</span>
                </div>
                <h3 className="font-semibold text-green-900 dark:text-green-100 text-sm sm:text-base">
                  Recording Income
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-green-800 dark:text-green-200">
                Use positive amounts (e.g., 1000) for income like salary, bonuses, or any money received.
              </p>
            </div>

            {/* Expense Tip */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 rounded-xl p-4 sm:p-6 border border-red-200 dark:border-red-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-200 dark:bg-red-700 rounded-full flex items-center justify-center">
                  <span className="text-lg">📉</span>
                </div>
                <h3 className="font-semibold text-red-900 dark:text-red-100 text-sm sm:text-base">
                  Recording Expenses
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-red-800 dark:text-red-200">
                Use negative amounts (e.g., -50) for expenses like food, bills, or any money spent.
              </p>
            </div>

            {/* Category Tip */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-200 dark:bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-lg">🏷️</span>
                </div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm sm:text-base">
                  Categorizing
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                Use clear categories like "Food", "Transport", "Salary" to organize your transactions better.
              </p>
            </div>
          </div>

          {/* Quick Action Tips */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-800/20 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-600">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
                  <span className="text-xl">💡</span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                Quick Tips for Better Tracking
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold text-sm">•</span>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    Be specific with titles (e.g., "Lunch at McDonald's" instead of just "Food")
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold text-sm">•</span>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    Use consistent category names for better analysis and reports
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold text-sm">•</span>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    Record transactions as soon as possible while details are fresh
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold text-sm">•</span>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    Double-check amounts and dates before saving to maintain accuracy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Common Categories Suggestion */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                🎯 Suggested Categories
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Popular categories to help you get started
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                {emoji: '🍔', category: 'Food', color: 'orange'},
                {emoji: '🚗', category: 'Transport', color: 'blue'},
                {emoji: '🏠', category: 'Housing', color: 'green'},
                {emoji: '🎬', category: 'Entertainment', color: 'purple'},
                {emoji: '💊', category: 'Healthcare', color: 'red'},
                {emoji: '📚', category: 'Education', color: 'indigo'},
                {emoji: '💰', category: 'Salary', color: 'emerald'},
                {emoji: '🛒', category: 'Shopping', color: 'pink'}
              ].map((item, index) => (
                <div key={index} className={`flex items-center gap-2 p-3 rounded-lg bg-${item.color}-50 dark:bg-${item.color}-900/30 border border-${item.color}-200 dark:border-${item.color}-700`}>
                  <span className="text-lg">{item.emoji}</span>
                  <span className={`text-sm font-medium text-${item.color}-800 dark:text-${item.color}-200`}>
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}