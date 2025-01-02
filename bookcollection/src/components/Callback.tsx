import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //  message from the URL after redirect
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      console.log("Token:", token);
      navigate("/display");
    } else {
      alert("Google login failed");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
