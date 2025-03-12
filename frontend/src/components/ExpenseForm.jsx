import { useState } from 'react';
import { addExpense } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseForm = ({ onExpenseAdded }) => {
  const [expense, setExpense] = useState({ amount: '', category: '', date: '', description: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!expense.amount || expense.amount <= 0) {
      newErrors.amount = expense.amount ? 'Amount must be greater than 0' : 'Amount is required';
    }
    if (!expense.category) {
      newErrors.category = 'Category is required';
    }
    if (!expense.date) {
      newErrors.date = 'Date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await addExpense(expense);
      toast.success('Expense added successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      setExpense({ amount: '', category: '', date: '', description: '' }); 
      setErrors({}); 
      if (onExpenseAdded) onExpenseAdded(); 
    } catch (error) {
      toast.error(`Error adding expense: ${error.message || 'Something went wrong'}`, {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setExpense((prev) => ({ ...prev, [field]: value }));
    const newErrors = { ...errors };
    if (field === 'amount' && value > 0) delete newErrors.amount;
    if (field === 'category' && value) delete newErrors.category;
    if (field === 'date' && value) delete newErrors.date;
    setErrors(newErrors);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl md:shadow-2xl w-full max-w-sm md:max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Add New Expense
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              placeholder="Amount (₹)"
              value={expense.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700`}
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Category"
              value={expense.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700`}
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>
        </div>
        <div>
          <input
            type="date"
            value={expense.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-500">{errors.date}</p>
          )}
        </div>
        <textarea
          placeholder="Description (optional)"
          value={expense.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 min-h-[100px]"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold transition-all duration-300 md:text-lg ${
            isSubmitting
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'
          }`}
        >
          {isSubmitting ? 'Adding...' : 'Add Expense'}
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ExpenseForm;