import React, { useEffect, useState } from 'react';
import { getTransaction, deleteTransaction } from '../api/transactions';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function DeletePage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [tx, setTx] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    (async ()=>{
      try {
        const data = await getTransaction(id);
        setTx(data);
      } catch {
        toast.error('Failed to load transaction');
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      await deleteTransaction(id);
      toast.success('Transaction deleted successfully!', {
        icon: '🗑️',
        duration: 3000,
      });
      nav('/');
    } catch {
      toast.error('Failed to delete transaction. Please try again.', {
        duration: 4000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!tx) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 dark:from-gray-900 dark:to-red-900/20 flex items-center justify-center">
        <div className="text-center">
          {/* Loading Spinner */}
          <div className="relative mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-red-200 dark:border-red-800 rounded-full animate-spin">
              <div className="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 bg-red-600 rounded-full"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl animate-pulse">🔍</span>
            </div>
          </div>

          {/* Loading Text */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Loading Transaction
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Fetching transaction details...
          </p>

          {/* Loading Animation Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  const isIncome = tx.amount >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 dark:from-gray-900 dark:to-red-900/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8 text-sm sm:text-base">
          <Link 
            to="/"
            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 font-medium"
          >
            ← Back to Dashboard
          </Link>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 dark:text-gray-400">Delete Transaction</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 rounded-full flex items-center justify-center border-4 border-red-200 dark:border-red-700">
              <span className="text-3xl sm:text-4xl">⚠️</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 dark:text-red-400 mb-4">
            🗑️ Delete Transaction
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Are you sure you want to permanently delete this transaction? This action cannot be undone.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          {/* Transaction Details Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-red-200 dark:border-red-700 overflow-hidden">
            {/* Warning Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 sm:py-6">
              <div className="flex items-center gap-3 text-white">
                <span className="text-2xl">🚨</span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Transaction to be Deleted
                  </h2>
                  <p className="text-red-100 text-sm sm:text-base mt-1">
                    Review the details below before confirming
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Title and Amount Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {tx.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      isIncome 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {isIncome ? '📈 Income' : '📉 Expense'}
                    </span>
                  </div>
                </div>
                
                {/* Amount Display */}
                <div className="text-right">
                  <div className={`text-3xl sm:text-4xl font-bold ${
                    isIncome 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {isIncome ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      {tx.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      {format(new Date(tx.date), 'PPP')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-900/20 dark:to-red-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <div>
                <h3 className="font-bold text-amber-800 dark:text-amber-200 text-lg mb-2">
                  Warning: Permanent Deletion
                </h3>
                <p className="text-amber-700 dark:text-amber-300 text-sm sm:text-base">
                  This action will permanently remove this transaction from your records. 
                  You won't be able to recover it once deleted. Make sure this is what you want to do.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`flex-1 sm:flex-none sm:min-w-[200px] px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 ${
                isDeleting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {isDeleting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    🗑️ Confirm Delete
                  </>
                )}
              </span>
            </button>
            
            <Link
              to="/"
              className="flex-1 sm:flex-none sm:min-w-[200px] px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-800 dark:text-gray-200 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 text-center"
            >
              <span className="flex items-center justify-center gap-2">
                🔙 Cancel & Go Back
              </span>
            </Link>
          </div>

          {/* Additional Safety Note */}
          <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              💡 <strong>Tip:</strong> Consider editing the transaction instead of deleting it if you just need to make changes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}