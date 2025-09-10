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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
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
          <span className="text-gray-600 dark:text-gray-400">Edit Transaction</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            ✏️ Edit Transaction
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Update your transaction details and keep your finances accurate
          </p>
        </div>

        {/* Main Content */}
        {initial ? (
          <div className="space-y-6">
            {/* Transaction Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">📝</span>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Transaction Details
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Editing: <span className="font-medium">{initial.title}</span>
                  </p>
                </div>
              </div>

              {/* Form Container */}
              <TransactionForm 
                initial={initial} 
                onSubmit={handleSubmit} 
                submitLabel="Update Transaction"
              />
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Save Reminder Card */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-200 dark:bg-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-sm">💡</span>
                  </div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                    Quick Tip
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-blue-800 dark:text-blue-200">
                  Remember to save your changes by clicking the "Update Transaction" button below
                </p>
              </div>

              {/* Cancel Option Card */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">🔄</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Need to Cancel?
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3">
                  Your changes won't be saved if you navigate away
                </p>
                <button
                  onClick={() => nav('/')}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  Cancel & Go Back →
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="relative">
              {/* Animated Loading Spinner */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin">
                <div className="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded-full"></div>
              </div>
              
              {/* Loading Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl animate-pulse">⏳</span>
              </div>
            </div>

            {/* Loading Text */}
            <div className="mt-6 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Loading Transaction
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Please wait while we fetch your transaction details...
              </p>
            </div>

            {/* Loading Animation Dots */}
            <div className="flex items-center gap-2 mt-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}