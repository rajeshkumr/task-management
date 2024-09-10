// pages/tasks/[id].tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

type Task = {
  id: string;
  name: string;
  completed: boolean;
};

const TaskDetail: React.FC = () => {
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(process.env.NEXT_PUBLIC_HOST + `/tasks/${id}`).then(response => setTask(response.data));
    }
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h1>{task.name}</h1>
      <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default TaskDetail;
