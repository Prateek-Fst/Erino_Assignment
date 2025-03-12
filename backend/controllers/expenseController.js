import Expense from '../models/Expense.js';
import mongoose from 'mongoose';

export const addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    const expense = await Expense.create({ user: req.user.id, amount, category, date, description });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//   try {
//     const expenses = await Expense.find({ user: req.user.id });

//     const insights = expenses.reduce((acc, expense) => {
//       acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
//       return acc;
//     }, {});

//     res.json(insights);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


export const getInsights = async (req, res) => {
    try {
      const insights = await Expense.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
        {
          $group: {
            _id: '$category',
            totalAmount: { $sum: '$amount' }
          }
        },
        {
          $project: {
            _id: 0,
            category: '$_id',
            totalAmount: 1
          }
        }
      ]);
      const totalSpending = insights.reduce((sum, item) => sum + item.totalAmount, 0);
      const enrichedInsights = insights.map(item => ({
        ...item,
        percentage: totalSpending > 0 ? ((item.totalAmount / totalSpending) * 100).toFixed(2) : 0
      }));
  
      res.json(enrichedInsights);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };