import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  CredentialResponse,
} from "@react-oauth/google";
import { AuthManager } from "../services/AuthManager";

// Google Client ID
const googleClientId =
  "708779968793-gpjf8o61e2ntb623f3h70kpnvcckstvo.apps.googleusercontent.com";

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();

  const onSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const tokenId = credentialResponse.credential;
      localStorage.setItem("authToken", tokenId); // Store token in localStorage

      const decodedToken = AuthManager.decodeToken(); // Decode token from localStorage
      if (decodedToken) {
        console.log("Decoded Token in onSuccess:", decodedToken);

        const { name, userRole } = decodedToken as {
          name: string;
          userRole: string;
        };

        if (!userRole) {
          console.error("User role is undefined in the token payload.");
          alert("Login failed: Role information missing.");
          return;
        }

        console.log("Name:", name, "Role:", userRole);

        AuthManager.loginWithGoogle(tokenId, name, userRole);

        navigate("/display");
      } else {
        console.error("Failed to decode Google login token.");
        alert("Google Login failed. Please try again.");
      }
    } else {
      console.error("Google login response missing credential.");
      alert("Google Login failed. Please try again.");
    }
  };

  const onFailure = () => {
    console.error("Google Login Failed");
    alert("Google Login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <GoogleLogin onSuccess={onSuccess} onError={onFailure} useOneTap />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
