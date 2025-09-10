import React from 'react';
import TransactionItem from './TransactionItem';

export default function TransactionList({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 sm:p-12 text-center shadow-sm">
          <div className="flex flex-col items-center space-y-4">
            {/* Empty State Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">📊</span>
            </div>
            
            {/* Empty State Text */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300">
                No transactions yet
              </h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-sm">
                Start tracking your finances by adding your first transaction
              </p>
            </div>
            
            {/* Decorative Elements */}
            <div className="flex space-x-2 opacity-60">
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* List Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              💰 Recent Transactions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
              {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          {/* Summary Stats */}
          <div className="flex gap-4 sm:gap-6">
            {(() => {
              const income = transactions.filter(tx => tx.amount >= 0).reduce((sum, tx) => sum + tx.amount, 0);
              const expenses = transactions.filter(tx => tx.amount < 0).reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
              
              return (
                <>
                  <div className="text-center">
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Income</div>
                    <div className="text-sm sm:text-base font-semibold text-green-600 dark:text-green-400">
                      +₹{income.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Expenses</div>
                    <div className="text-sm sm:text-base font-semibold text-red-600 dark:text-red-400">
                      -₹{expenses.toLocaleString()}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Transaction List Container */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {/* List Header Row - Hidden on Mobile */}
        <div className="hidden sm:flex items-center px-6 py-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Transaction Details</span>
          </div>
          <div className="w-32 text-right">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount</span>
          </div>
          <div className="w-24 text-right">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Actions</span>
          </div>
        </div>

        {/* Transaction Items */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((tx, index) => (
            <div 
              key={tx._id} 
              className={`transition-all duration-200 ${
                index % 2 === 0 
                  ? 'bg-white dark:bg-gray-800' 
                  : 'bg-gray-25 dark:bg-gray-825'
              }`}
            >
              <TransactionItem tx={tx} />
            </div>
          ))}
        </div>

        {/* List Footer */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Showing all {transactions.length} transactions
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Income</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Expense</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}