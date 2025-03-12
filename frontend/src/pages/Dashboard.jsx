// import { useNavigate } from 'react-router-dom'; 
// import ExpenseList from '../components/ExpenseList';
// import ExpenseForm from '../components/ExpenseForm';
// import InsightsChart from '../components/InsightsChart';
// import { logout } from '../api'; 

// const Dashboard = () => {
//   const navigate = useNavigate(); 
//   const handleLogout = async () => {
//     try {
//       await logout(); 
//       localStorage.removeItem('token'); 
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout failed:', error);
//       alert('Failed to logout. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-center mb-8 md:mb-12">
//           <h1 className="text-3xl md:text-5xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Expense Dashboard
//           </h1>
//           <button
//             onClick={handleLogout}
//             className="ml-4 px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm md:text-base"
//           >
//             Logout
//           </button>
//         </div>
//         <div className="space-y-6 md:space-y-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//             <div className="w-full">
//               <ExpenseForm />
//             </div>
//             <div className="w-full">
//               <ExpenseList />
//             </div>
//           </div>
//           <div className="w-full">
//             <InsightsChart />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useNavigate } from 'react-router-dom'; 
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import InsightsChart from '../components/InsightsChart';
import { logout } from '../api'; 
import { useState } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [refreshInsights, setRefreshInsights] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  // Function to trigger insights refresh
  const triggerInsightsRefresh = () => {
    setRefreshInsights(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Expense Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="ml-4 px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm md:text-base"
          >
            Logout
          </button>
        </div>
        <div className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="w-full">
              <ExpenseForm onExpenseAdded={triggerInsightsRefresh} />
            </div>
            <div className="w-full">
              <ExpenseList onExpenseDeleted={triggerInsightsRefresh} refresh={refreshInsights}/>
            </div>
          </div>
          <div className="w-full">
            <InsightsChart refresh={refreshInsights} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;