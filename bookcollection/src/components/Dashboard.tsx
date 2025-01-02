import React from "react";
import { AuthManager } from "../services/AuthManager";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const name = AuthManager.getUserName();
  const role = AuthManager.getUserRole();

  const handleLogout = () => {
    AuthManager.logout();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {name}!</h1>
      <p>Role: {role}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
