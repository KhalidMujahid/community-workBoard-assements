import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const UserMenu: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="space-x-4">
        <Link to="/login" className="text-blue-600 hover:text-blue-800">
          Login
        </Link>
        <Link to="/register" className="text-blue-600 hover:text-blue-800">
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700">Hello, {user.name}</span>
      <Link
        to={
          user.role === "contributor"
            ? "/dashboard/contributor"
            : "/dashboard/volunteer"
        }
        className="text-blue-600 hover:text-blue-800"
      >
        Dashboard
      </Link>
      <button
        onClick={handleLogout}
        className="text-blue-600 hover:text-blue-800"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
