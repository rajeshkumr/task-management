import Link from 'next/link';
import { Task } from '../types.d';

type Props = {
  task: Task;
  onDelete: () => void;
};

export const TaskItem: React.FC<Props> = ({ task, onDelete }) => (
  <li>
    {task.name} - {task.completed ? 'Completed' : 'Pending'}
    <Link href={`/edit-task/${task.id}`}>Edit</Link>
    <button onClick={onDelete}>Delete</button>
  </li>
);
