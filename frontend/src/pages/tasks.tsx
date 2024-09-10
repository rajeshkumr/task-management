import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { instance } from "../lib/axios";
import Header from '../components/Header';
import { api } from '../common/api';

interface Task {
  status: string;
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized access. Please log in.');
        router.push('/');
        return;
      }

      try {
        const response = await instance().get(api.tasks);
        setTasks(response.data);
        setError(null);
      } catch (err: any) {
        if (err.response?.status === 401) {
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

  // Delete a task
  const handleDeleteTask = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await instance().delete(`${api.tasks}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the task list after deletion
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

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
    <div>
      <Header /> {/* Include the common header */}
      
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">All Tasks</h1>
          <button
            onClick={() => router.push('/add-task')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add New Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">{task.title}</h2>
              <p className="mb-4">{task.description}</p>
              <p className={`mb-2 ${task.status === "completed" ? 'text-green-500' : 'text-yellow-500'}`}>
                {task.status}
              </p>
              <p className="text-gray-500 text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              
              <div className="mt-4 flex justify-between">
                {/* Edit Task */}
                <button
                  onClick={() => router.push(`/edit-task/${task.id}`)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                
                {/* Delete Task */}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Dashboard button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
