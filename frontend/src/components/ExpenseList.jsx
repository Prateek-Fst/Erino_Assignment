import { useEffect, useState } from 'react';
import { getExpenses, deleteExpense } from '../api';


const ExpenseList = ({onExpenseDeleted, refresh}) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, [refresh]);

  const fetchExpenses = async () => {
    try {
      const { data } = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter((expense) => expense._id !== id));
      if (onExpenseDeleted) onExpenseDeleted();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-2xl mx-auto">
     
      <div className="bg-white shadow-xl md:shadow-2xl rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
        Your Expenses
      </h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center">No expenses added yet.</p>
        ) : (
          <ul className="space-y-4">
            {expenses.map((expense) => (
              <li 
                key={expense._id} 
                className="flex flex-col md:flex-row justify-between items-start md:items-center border-b py-3 md:py-4 transition-all duration-200 hover:bg-gray-50"
              >
                <div className="mb-2 md:mb-0">
                  <p className="font-medium text-gray-800">{expense.category}</p>
                  <p className="text-gray-600">₹{expense.amount} - {new Date(expense.date).toLocaleDateString()}</p>
                  {expense.description && <p className="text-gray-500 text-sm italic">{expense.description}</p>}
                </div>
                <button
                  onClick={() => handleDelete(expense._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
