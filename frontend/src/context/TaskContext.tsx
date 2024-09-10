import { createContext, useContext, useEffect, useState } from 'react';
import  { instance } from '../lib/axios';
import { api } from '../common/api';

const TaskContext = createContext(null);

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await instance().get(process.env.NEXT_PUBLIC_HOST + api.tasks);
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_HOST + api.tasks, task);
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};
