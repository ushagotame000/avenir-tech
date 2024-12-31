import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Display } from "./components/Display";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/display" element={<Display />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
