import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import GoogleLoginButton from "./GoogleLoginButton";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   try {
  //     AuthManager.login(email, password);
  //     navigate("/display");
  //   } catch (error) {
  //     const errorMessage =
  //       (error as Error).message || "An unknown error occurred.";

  //     alert(errorMessage);
  //   }
  // };
  //after using authcontex
  const handleLogin = () => {
    login(email, password);
    navigate("/display");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
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
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
      <p>
        Already don't have a account?{" "}
        <Link to="/register" className="text-purple-400">
          {" "}
          Click me for Register
        </Link>
      </p>
      <div className="google-login">
        <h3>Or</h3>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
