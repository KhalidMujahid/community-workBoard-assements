import React, { useEffect, useState } from "react";
import TaskList from "../../components/TaskList";
import { getAllTasks } from "../../api/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  createdBy: { name: string };
}

const VolunteerDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getAllTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Volunteer Dashboard</h2>
      <h3 className="text-xl font-bold mb-4">Available Tasks</h3>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default VolunteerDashboard;
