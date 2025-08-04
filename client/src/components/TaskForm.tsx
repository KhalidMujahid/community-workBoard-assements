import React, { useState } from "react";

interface TaskFormProps {
  onSubmit: (task: { title: string; description: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    createdBy: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ title: "", description: "", createdBy: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
