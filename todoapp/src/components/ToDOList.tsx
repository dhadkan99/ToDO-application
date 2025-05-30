"use client";

import { Task } from "@/types/task";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (id: string, updated: { text: string; description?: string }) => void;
  onSelect?: (task: Task) => void;
}

export default function TodoList({ tasks, onDelete, onToggle, onEdit, onSelect }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-white/70 mt-10">
        No tasks yet <br />
        <span className="text-sm">Add a task to get started!</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto w-full">
      {tasks.map((task) => (
        <div key={task._id} onClick={() => onSelect?.(task)} className="cursor-pointer">
          <TaskCard
            task={task}
            onToggle={(id) => onToggle(id, !task.completed)}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      ))}
    </div>
  );
}
