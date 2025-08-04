import { Routes as RouterRoutes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ContributorDashboard from "./pages/Dashboard/ContributorDashboard";
import VolunteerDashboard from "./pages/Dashboard/VolunteerDashboard";
import TaskDetail from "./pages/TaskDetail";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <VolunteerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/contributor"
        element={
          <ProtectedRoute allowedRoles={["contributor"]}>
            <ContributorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/volunteer"
        element={
          <ProtectedRoute allowedRoles={["volunteer"]}>
            <VolunteerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks/:id"
        element={
          <ProtectedRoute>
            <TaskDetail />
          </ProtectedRoute>
        }
      />
    </RouterRoutes>
  );
};
