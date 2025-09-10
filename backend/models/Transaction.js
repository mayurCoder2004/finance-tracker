const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true }, // + for income, - for expense (or use separate type)
  date: { type: Date, required: true },
  category: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
