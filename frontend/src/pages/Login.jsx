import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      setUser(data.user);
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 md:p-8">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl md:shadow-2xl w-full max-w-sm md:max-w-2xl transform transition-all hover:scale-100 md:hover:scale-105">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-10 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700"
          />

          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700"
          />

          <button 
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform transition-all duration-300 hover:shadow-lg md:text-lg"
          >
            Login Now
          </button>
        </form>

        <p className="mt-4 md:mt-6 text-center text-sm md:text-base text-gray-600">
          Don’t have an account?{' '}
          <Link 
            to="/register" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign Up here
          </Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;