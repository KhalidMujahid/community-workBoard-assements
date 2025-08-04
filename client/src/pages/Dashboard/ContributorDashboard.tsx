import React, { useEffect, useState } from "react";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import ApplicationList from "../../components/ApplicationList";
import { createTask, getUserTasks, getTaskApplications } from "../../api/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  createdBy: { name: string };
}

interface Application {
  _id: string;
  message: string;
  userId: { name: string };
}

const ContributorDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getUserTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (selectedTask) {
      const fetchApplications = async () => {
        const data = await getTaskApplications(selectedTask);
        setApplications(data);
      };
      fetchApplications();
    }
  }, [selectedTask]);

  const handleCreateTask = async (task: {
    title: string;
    description: string;
  }) => {
    const newTask = await createTask(task);
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contributor Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Create New Task</h3>
          <TaskForm onSubmit={handleCreateTask} />
          <h3 className="text-xl font-bold mb-4">Your Posted Tasks</h3>
          <TaskList
            tasks={tasks}
            onTaskSelect={setSelectedTask}
            selectedTask={selectedTask}
          />
        </div>
        <div>
          {selectedTask ? (
            <ApplicationList applications={applications} />
          ) : (
            <p>Select a task to view applications</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContributorDashboard;
