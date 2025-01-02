import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Display } from "./components/Display";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import BarGraph from "./components/graphs/BarGraph";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/display" element={<Display />} />
          <Route path="/bargraph" element={<BarGraph />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
