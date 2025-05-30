"use client";

import { useState } from "react";
import { Task } from "@/types/task";

interface Props {
  task: Task & { description?: string };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string, updated: { text: string; description?: string }) => void;
}

export default function TaskCard({ task, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [desc, setDesc] = useState(task.description || "");

  const handleSave = () => {
    if (!text.trim()) return;
    onEdit?.(task._id, { text: text.trim(), description: desc.trim() });
    setIsEditing(false);
  };

  return (
    <div className="bg-white/10 px-6 py-5 rounded-xl flex flex-col sm:flex-row justify-between items-start text-white shadow-md backdrop-blur-sm w-full max-w-2xl">
      <div className="flex-1">
        {isEditing ? (
          <>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="text-lg font-semibold bg-transparent border-b border-white/30 focus:outline-none w-full mb-2 placeholder-white/40"
              placeholder="Edit task title..."
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={2}
              className="text-sm bg-transparent border border-white/20 rounded-lg p-2 w-full placeholder-white/40 mb-2"
              placeholder="Add description..."
            />
          </>
        ) : (
          <>
            <h3 className={`text-lg font-semibold break-words ${task.completed ? "line-through opacity-50" : ""}`}>
              {task.text}
            </h3>
            {task.description && (
              <p className="text-sm text-white/70 mt-1 whitespace-pre-line">{task.description}</p>
            )}
          </>
        )}

        <p className="text-sm text-white/50 mt-2">
          {new Date(task.date).toLocaleString()}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 sm:ml-4 items-end sm:items-center">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              Save
            </button>
            <button
              onClick={() => {
                setText(task.text);
                setDesc(task.description || "");
                setIsEditing(false);
              }}
              className="text-sm px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => task._id && onToggle(task._id)}
              className="text-sm px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
            >
              {task.completed ? "Undo" : "Done"}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              Edit
            </button>
            <button
              onClick={() => task._id && onDelete(task._id)}
              className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
