import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function TransactionItem({ tx }) {
  const isIncome = tx.amount >= 0;
  
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group">
      {/* Transaction Details */}
      <div className="flex-1 mb-3 sm:mb-0">
        <div className="flex items-start gap-3">
          {/* Category Icon */}
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
            isIncome 
              ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
              : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
          }`}>
            {isIncome ? '📈' : '📉'}
          </div>
          
          <div className="min-w-0 flex-1">
            {/* Transaction Title */}
            <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 truncate">
              {tx.title}
            </h3>
            
            {/* Category and Date */}
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                {tx.category}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1">
                📅 {format(new Date(tx.date), 'PP')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Amount and Actions */}
      <div className="flex flex-row sm:flex-col sm:items-end justify-between sm:justify-start gap-2 sm:gap-3">
        {/* Amount */}
        <div className={`text-lg sm:text-xl font-bold ${
          isIncome 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-red-600 dark:text-red-400'
        }`}>
          <span className="inline-flex items-center gap-1">
            {isIncome ? '↗️ +₹' : '↙️ -₹'}{Math.abs(tx.amount).toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link 
            to={`/${tx._id}/edit`}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            ✏️ Edit
          </Link>
          <Link 
            to={`/${tx._id}/delete`}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            🗑️ Delete
          </Link>
        </div>
      </div>
    </div>
  );
}