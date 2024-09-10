import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { instance } from "../../lib/axios";
import Header from '../../components/Header';
import { api } from '../../common/api';

const EditTask = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending'); // Default to 'pending'
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        try {
          const response = await instance().get(`${api.tasks}/${id}`);
          const task = response.data;

          setTitle(task.title);
          setDescription(task.description);
          setDueDate(task.dueDate.split("T")[0]);
          setStatus(task.status || 'pending'); // Handle missing status
        } catch (error: any) {
          setError('Failed to load task');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTask();
  }, [id]);

  const handleEditTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      setError('All fields are required.');
      return;
    }

    try {
      await instance().put(`${api.tasks}/${id}`, {
        title,
        description,
        dueDate,
        status
      });

      router.push('/tasks');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to edit task');
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading task...</p>;

  return (
    <div>
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-8 text-center">Edit Task</h1>

        <form onSubmit={handleEditTask} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <label className="block text-gray-700 text-sm font-medium">Task Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">Task Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">Due Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg mt-1"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">Status</label>
            <select
              className="w-full px-4 py-2 border rounded-lg mt-1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </form>

        <div className="mt-8 text-center space-x-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Back to Dashboard
          </button>

          <button
            onClick={() => router.push('/tasks')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go to All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
