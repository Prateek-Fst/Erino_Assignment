import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  category: String,
  date: { type: Date, required: true },
  description: String,
}, { timestamps: true });

export default mongoose.model('Expense', ExpenseSchema);
