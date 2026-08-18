import { Task } from "@/types/task";
import { UpdateTaskInput } from "@/lib/api";
import { TaskItem } from "@/components/TaskItem";

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: string, input: UpdateTaskInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        No tasks found.
      </p>
    );
  }

  return (
    <ul className="space-y-2 w-full min-w-0">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
