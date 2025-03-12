import { useEffect, useState } from 'react';
import { getInsights } from '../api';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const InsightsChart = ({refresh}) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const { data } = await getInsights();
        setInsights(data); 
      } catch (error) {
        console.error('Error fetching insights:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, [refresh]);
  const chartData = {
    labels: insights.map((item) => item.category),
    datasets: [
      {
        data: insights.map((item) => item.totalAmount),
        backgroundColor: [
          '#3B82F6',
          '#8B5CF6',
          '#EC4899',
          '#10B981',
          '#F59E0B',
          '#EF4444',
        ],
        hoverBackgroundColor: [
          '#2563EB',
          '#7C3AED',
          '#DB2777',
          '#059669',
          '#D97706',
          '#DC2626',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14 },
          color: '#374151',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = insights[context.dataIndex]?.percentage || 0;
            return `${label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-6 md:mt-10 w-full max-w-sm md:max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Spending Insights
      </h2>
      <div className="bg-white shadow-xl md:shadow-2xl rounded-2xl p-6 md:p-8">
        {loading ? (
          <p className="text-gray-500 text-center">Loading insights...</p>
        ) : insights.length === 0 ? (
          <p className="text-gray-500 text-center">No insights available yet.</p>
        ) : (
          <div className="max-w-lg mx-auto" style={{ height: '400px' }}>
            <Pie data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightsChart;