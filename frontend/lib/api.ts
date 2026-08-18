import { Task } from "@/types/task";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface GetTasksParams {
  search?: string;
  status?: "all" | "completed" | "incomplete";
}

// throws a clean Error using the backend's message, no body parsing assumed
async function throwIfError(response: Response): Promise<void> {
  if (!response.ok) {
    const errorBody = await response.text();
    let message = errorBody || response.statusText;
    try {
      const parsed = JSON.parse(errorBody);
      if (parsed?.message) message = parsed.message;
    } catch {
      // body wasn't JSON, fall back to raw text
    }
    throw new Error(message);
  }
}

// helper so every function doesnt repeat the same error logic
async function handleResponse<T>(response: Response): Promise<T> {
  await throwIfError(response);
  return response.json();
}

export async function getTasks(params?: GetTasksParams): Promise<Task[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.status) query.set("status", params.status);

  const queryString = query.toString();
  const url = `${API_BASE_URL}/tasks${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);
  return handleResponse<Task[]>(response);
}

export async function getTask(id: string): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
  return handleResponse<Task>(response);
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse<Task>(response);
}

export async function updateTask(
  id: string,
  input: UpdateTaskInput,
): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse<Task>(response);
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  await throwIfError(response);
}
