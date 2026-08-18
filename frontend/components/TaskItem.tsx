"use client";

import { useState } from "react";
import { Task } from "@/types/task";
import { UpdateTaskInput } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, input: UpdateTaskInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description ?? "",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleToggleComplete() {
    try {
      setError(null);
      await onUpdate(task.id, { completed: !task.completed });
    } catch {
      setError("Failed to update task.");
    }
  }

  function startEditing() {
    setEditTitle(task.title);
    setEditDescription(task.description ?? "");
    setIsEditing(true);
    setError(null);
  }

  async function handleSaveEdit() {
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) {
      setError("Title is required.");
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      await onUpdate(task.id, {
        title: trimmedTitle,
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    } catch {
      setError("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    setError(null);
    try {
      await onDelete(task.id);
    } catch {
      setError("Failed to delete task.");
      setIsDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <li className="border border-border rounded-md p-4 space-y-2">
        <Input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          disabled={isSaving}
        />
        <Textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Description (optional)"
          disabled={isSaving}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSaveEdit} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsEditing(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
        </div>
      </li>
    );
  }

  return (
    <li className="border border-border rounded-md p-4 flex flex-col sm:flex-row sm:items-start gap-3 min-w-0">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggleComplete}
          className="mt-1"
        />
        <div className="flex-1 min-w-0">
          <p
            className={`break-words ${task.completed ? "line-through text-muted-foreground" : ""}`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-sm text-muted-foreground break-words">
              {task.description}
            </p>
          )}
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <Button size="sm" variant="secondary" onClick={startEditing}>
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </li>
  );
}
