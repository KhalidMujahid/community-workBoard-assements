import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, applyToTask } from "../api/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  createdBy: { name: string };
}

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [message, setMessage] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      const data = await getTask(id!);
      setTask(data);
    };
    fetchTask();
  }, [id]);

  const handleApply = async () => {
    await applyToTask(id!, message);
    setIsApplied(true);
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        &larr; Back to Dashboard
      </button>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
        <p className="text-gray-600 mb-4">{task.description}</p>
        <p className="text-sm text-gray-500 mb-6">
          Posted by: {task.createdBy?.name}
        </p>

        {isApplied ? (
          <div className="bg-green-100 text-green-800 p-4 rounded">
            You have successfully applied to this task!
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-bold mb-2">Apply to this task</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-4"
              rows={4}
              placeholder="Write a message to the task contributor..."
            />
            <button
              onClick={handleApply}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
