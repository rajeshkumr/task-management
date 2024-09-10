import { useState } from 'react';
import { useRouter } from 'next/router';
import { instance } from "../lib/axios";
import Header from '../components/Header';
import { api } from '../common/api';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      setError('All fields are required.');
      return;
    }

    try {
      await instance().post(api.tasks, {
        title,
        description,
        dueDate,
      });

      router.push('/tasks'); // Navigate to All Tasks page
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to add task');
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-8 text-center">Add New Task</h1>

        <form onSubmit={handleAddTask} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <label className="block text-gray-700">Task Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-gray-700">Task Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label className="block text-gray-700">Due Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </form>

        {/* Navigation buttons */}
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

export default AddTask;
