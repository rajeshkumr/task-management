type Props = {
  taskName: string;
  setTaskName: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
};

export const TaskForm: React.FC<Props> = ({ taskName, setTaskName, onSubmit, submitLabel }) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      placeholder="Task Name"
      value={taskName}
      onChange={(e) => setTaskName(e.target.value)}
    />
    <button type="submit">{submitLabel}</button>
  </form>
);
