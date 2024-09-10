import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios, { instance } from "../lib/axios";
import { api } from '../common/api';

// Define the shape of a Task object
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status?: 'pending' | 'in-progress' | 'completed'; // status is optional
}

// Define the shape of the context value
interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create a Context with default values
const TaskContext = createContext<TaskContextType>({
  tasks: [],
  loading: false,
  error: null,
  setTasks: () => {},
  setLoading: () => {},
  setError: () => {},
});

export const useTasks = () => useContext(TaskContext);

interface TaskProviderProps {
  children: ReactNode; // Specify the type for children
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks and handle errors
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await instance().get(api.tasks);
      setTasks(response.data);
    } catch (err: unknown) {
      setError(err instanceof axios.AxiosError && err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Call fetchTasks initially
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, setTasks, setLoading, setError }}>
      {children}
    </TaskContext.Provider>
  );
};
