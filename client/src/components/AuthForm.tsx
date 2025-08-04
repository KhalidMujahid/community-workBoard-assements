import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as api from "../api/api";
import { loginSuccess } from "../store/authSlice";

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "volunteer",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (type === "login") {
        const { access_token, user } = await api.login({
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", access_token);
        dispatch(loginSuccess(user));
        navigate("/dashboard");
      } else {
        await api.register(formData);
        navigate("/login");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Authentication failed.");
      } else {
        setError("Authentication failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthType = () => {
    navigate(type === "login" ? "/register" : "/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {type === "login" ? "Login to Your Account" : "Create an Account"}
        </h2>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {type === "register" && (
            <>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </span>
                <div className="flex gap-4">
                  {["volunteer", "contributor"].map((role) => (
                    <label
                      key={role}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={formData.role === role}
                        onChange={handleChange}
                        className="accent-blue-600"
                        required
                      />
                      <span className="capitalize">{role}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading
              ? "Processing..."
              : type === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={toggleAuthType}
                className="text-blue-600 font-medium hover:underline cursor-pointer"
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already registered?{" "}
              <span
                onClick={toggleAuthType}
                className="text-blue-600 font-medium hover:underline cursor-pointer"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
