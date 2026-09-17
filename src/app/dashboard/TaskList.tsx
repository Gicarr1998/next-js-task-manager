import TaskItem from "./TaskItem";
import type { Task } from "@/lib/types";

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="mt-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found.</p>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
