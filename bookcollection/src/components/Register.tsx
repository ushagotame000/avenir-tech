import React, { useState } from "react";
import { AuthManager } from "../services/AuthManager";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setemail] = useState("");
  const [role, setRole] = useState<"Admin" | "Librarian" | "Guest">("Guest");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    try {
      AuthManager.register(email, role, password);
      alert("Registration successful! You can now log in.");
    } catch (error) {
      const errorMessage =
        (error as Error).message || "An unknown error occurred.";
      alert(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <select
        value={role}
        onChange={(e) =>
          setRole(e.target.value as "Admin" | "Librarian" | "Guest")
        }
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="Guest">Guest</option>
        <option value="Librarian">Librarian</option>
        <option value="Admin">Admin</option>
      </select>
      <button
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
      <p>
        Already have a account?{" "}
        <Link to="/login" className="text-purple-400">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
