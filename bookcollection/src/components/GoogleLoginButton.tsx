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

      localStorage.setItem("authToken", tokenId);
      const decodedToken = AuthManager.decodeToken();

      if (decodedToken) {
        console.log("Decoded Token in onSuccess:", decodedToken);

        const { email, name } = decodedToken as {
          email: string;
          name: string;
        };
        //degaul role
        const userRole = "Admin";
        console.log("Name:", name, "Email:", email, "Role:", userRole);

        AuthManager.loginWithGoogle(tokenId, email, userRole);
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
