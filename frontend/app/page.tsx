"use client";

import { useEffect, useState, useCallback } from "react";
import { Task } from "@/types/task";
import {
  getTasks,
  createTask,
  CreateTaskInput,
  updateTask,
  deleteTask,
  UpdateTaskInput,
} from "@/lib/api";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { SearchBar } from "@/components/SearchBar";
import { TaskFilters } from "@/components/TaskFilters";

export default function TaskManagementPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "completed" | "incomplete">(
    "all",
  );

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getTasks({ search, status });
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function handleCreateTask(input: CreateTaskInput) {
    const newTask = await createTask(input);
    setTasks((prev) => [newTask, ...prev]);
  }
  async function handleUpdateTask(id: string, input: UpdateTaskInput) {
    const updated = await updateTask(id, input);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDeleteTask(id: string) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6 w-full min-w-0 overflow-x-hidden">
      <h1 className="text-2xl font-semibold">Task Manager</h1>
      <TaskForm onSubmit={handleCreateTask} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <SearchBar value={search} onChange={setSearch} />
        <TaskFilters value={status} onChange={setStatus} />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}
    </main>
  );
}
