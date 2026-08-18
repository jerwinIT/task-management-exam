"use client";

import { useEffect, useState, useCallback } from "react";
import { Task } from "@/types/task";
import { getTasks, createTask, CreateTaskInput } from "@/lib/api";
import { TaskForm } from "@/components/TaskForm";

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

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Task Manager</h1>

      <TaskForm onSubmit={handleCreateTask} />

      {/* TODO: SearchBar goes here — controls `search` via setSearch */}
      {/* TODO: TaskFilters goes here — controls `status` via setStatus */}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading tasks...</p>
      ) : (
        <p className="text-sm text-muted-foreground">
          {tasks.length} task(s) — TaskList component goes here
        </p>
        // TODO: <TaskList tasks={tasks} onTasksChange={setTasks} />
      )}
    </main>
  );
}
