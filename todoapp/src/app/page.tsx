"use client";

import { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import TodoList from "../components/ToDOList";
import { Task } from "@/types/task";
import { Toaster } from "react-hot-toast";

const FILTERS = ["All", "Active", "Today", "Upcoming", "Completed", "Missed"] as const;
type Filter = typeof FILTERS[number];

function normalizeDate(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function filterTasks(tasks: Task[], filter: Filter): Task[] {
  const today = normalizeDate(new Date());

  switch (filter) {
    case "Today":
      return tasks.filter((task) => normalizeDate(new Date(task.date)).getTime() === today.getTime());
    case "Upcoming":
      return tasks.filter((task) => normalizeDate(new Date(task.date)) > today && !task.completed);
    case "Completed":
      return tasks.filter((task) => task.completed);
    case "Missed":
      return tasks.filter((task) => normalizeDate(new Date(task.date)) < today && !task.completed);
    case "Active":
      return tasks.filter((task) => !task.completed);
    default:
      return tasks;
  }
}

const TASKS_KEY = "todoapp-tasks";

function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks: Task[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const handleAdd = (text: string, date: string) => {
    const newTask: Task = {
      _id: Date.now().toString(),
      text,
      date,
      completed: false,
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    saveTasks(updated);
  };

  const handleDelete = (id: string) => {
    const updated = tasks.filter((task) => task._id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  const handleToggle = (id: string, completed: boolean) => {
    const updated = tasks.map((task) =>
      task._id === id ? { ...task, completed } : task
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const handleEdit = (id: string, updatedFields: { text: string; description?: string }) => {
    const updated = tasks.map((task) =>
      task._id === id ? { ...task, ...updatedFields } : task
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const filteredTasks = filterTasks(tasks, filter);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#a259c6",
            borderRadius: "12px",
            fontWeight: 500,
            boxShadow: "0 4px 32px rgba(80, 0, 120, 0.10)",
          },
        }}
      />

     <header className="w-full flex flex-col items-center justify-center pt-12 pb-6 text-center">
  <div className="flex items-center gap-3 mb-2">
    <img
      src="https://logopond.com/logos/5256a6afa39036ad90b08314476052b3.png"
      alt="Logo"
      className="w-12 h-12 rounded-md shadow-md"
    />
    <h1 className="text-4xl font-bold text-white drop-shadow-lg">TaskNest</h1>
  </div>
  <p className="text-white/80 text-lg max-w-md drop-shadow-sm">
    All your tasks, neatly in one place
  </p>
</header>

      <main className="max-w-4xl mx-auto px-4 pt-[120px] pb-[80px] w-full flex flex-col items-center relative z-1">
        <AddTask onAdd={handleAdd} />

        <div className="filter-bar flex gap-2 justify-center mb-8 p-2 bg-white/10 rounded-xl">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                filter === f
                  ? "bg-white/30 text-white shadow active"
                  : "text-white hover:bg-white/20"
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="ml-1 text-xs font-bold text-white/80">
                {filterTasks(tasks, f).length}
              </span>
            </button>
          ))}
        </div>

        <TodoList
          tasks={filteredTasks}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
        <footer className="w-full text-center text-sm text-white/60 py-6">
  <p>
    Created by <span className="font-semibold text-white hover:underline cursor-pointer">Dhadkan</span>
  </p>
  <p className="text-xs mt-1">&copy; {new Date().getFullYear()} TaskNest. All rights reserved.</p>
</footer>

      </main>

      
    </>
  );
}
