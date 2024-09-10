import { PieChart, Pie, Tooltip } from 'recharts';

type Task = {
  id: string;
  name: string;
  completed: boolean;
};

type Props = {
  tasks: Task[];
};

export const TaskStats: React.FC<Props> = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const data = [
    { name: 'Completed', value: completedTasks },
    { name: 'Pending', value: pendingTasks },
  ];

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
      <Tooltip />
    </PieChart>
  );
};
