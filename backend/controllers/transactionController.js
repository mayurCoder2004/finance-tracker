const Transaction = require('../models/Transaction');

// Create
exports.createTransaction = async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;
    if (!title || amount == null || !date || !category) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const tx = await Transaction.create({ title, amount, date, category });
    res.status(201).json(tx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read all with optional filters (category, startDate, endDate)
exports.getTransactions = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    const txs = await Transaction.find(filter).sort({ date: -1 });
    res.json(txs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read one
exports.getTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ message: 'Not found' });
    res.json(tx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tx) return res.status(404).json({ message: 'Not found' });
    res.json(tx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
exports.deleteTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findByIdAndDelete(req.params.id);
    if (!tx) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
