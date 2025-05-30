import { Task } from "@/types/task";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  if (tasks.length === 0)
    return (
      <p className="text-white/70 mt-10 text-center">
        No tasks yet <br />
        <span className="text-sm">Add a task to get started!</span>
      </p>
    );

  return (
    <div className="mt-6 space-y-3 w-full max-w-2xl mx-auto">
      {tasks.map((task) => (
        <TaskCard 
          key={task._id} 
          task={task} 
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
