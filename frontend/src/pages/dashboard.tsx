import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/router';
import axios, { instance } from '../lib/axios';
import { api } from '../common/api';
import Header from '../components/Header';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
    notStarted: 0
  });
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized access. Please log in.');
        router.push('/'); // Redirect to home if not authorized
        return;
      }

      try {
        const response = await instance().get(api.tasks);
        setTasks(response.data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof axios.AxiosError && err.response?.status === 401) {
          setError('Unauthorized. Please login.');
          localStorage.removeItem('token');
          router.push('/');
        } else {
          setError('Failed to load tasks. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [router]);

  useEffect(() => {
    if (tasks.length > 0) {
      const completedTasks = tasks.filter(task => task.status === "completed").length;
      const pendingTasks = tasks.filter(task => task.status === "pending").length;
      const inProgressTasks = tasks.filter(task => task.status === "in-progress").length;
      const noStartedTasks = tasks.filter(task => !task.status).length;
      setStats({
        total: tasks.length,
        completed: completedTasks,
        pending: pendingTasks,
        inProgress: inProgressTasks,
        notStarted: noStartedTasks
      });
    }
  }, [tasks]);

  const pieData = [
    { name: 'Completed Tasks', value: stats.completed },
    { name: 'Pending Tasks', value: stats.pending },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'No Started', value: stats.notStarted }
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  if (loading) return <p className="text-center">Loading tasks...</p>;
  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-red-500 text-xl mb-4">{error}</p>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => router.push('/')}
      >
        Go to Home
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-8">
      <Header />
      <h1 className="text-3xl font-semibold mb-8 text-center">Task Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Task Statistics</h2>
          <ul className="space-y-2">
            <li>Total Tasks: <span className="font-semibold">{stats.total}</span></li>
            <li>Completed Tasks: <span className="font-semibold">{stats.completed}</span></li>
            <li>Pending Tasks: <span className="font-semibold">{stats.pending}</span></li>
            <li>In Progress: <span className="font-semibold">{stats.inProgress}</span></li>
            <li>No Started: <span className="font-semibold">{stats.notStarted}</span></li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Task Completion Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart for Tasks */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Task Status Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: 'Completed', value: stats.completed },
              { name: 'Pending', value: stats.pending },
              { name: 'In Progress', value: stats.inProgress },
              { name: 'Not Started', value: stats.notStarted }
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center">
          <button
            onClick={() => router.push('/tasks')} // Navigate to tasks page
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition mt-10"
          >
            Go to All Tasks
          </button>
        </div>
    </div>
  );
};

export default Dashboard;
