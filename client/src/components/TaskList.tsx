import React from "react";
import { Link } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  description: string;
  createdBy: { name: string };
}

interface TaskListProps {
  tasks: Task[];
  onTaskSelect?: (taskId: string) => void;
  selectedTask?: string | null;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <p className="text-sm text-gray-500">
            Posted by: {task.createdBy.name}
          </p>
          <Link
            to={`/tasks/${task._id}`}
            className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
