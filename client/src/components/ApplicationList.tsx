import React from "react";

interface Application {
  _id: string;
  message: string;
  userId: { name: string };
}

interface ApplicationListProps {
  applications: Application[];
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications }) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">Applications</h3>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="bg-white p-4 rounded shadow">
              <p className="font-semibold">{app.userId.name}</p>
              <p className="text-gray-600">{app.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
