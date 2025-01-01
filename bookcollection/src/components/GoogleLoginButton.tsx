import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthManager } from "../services/AuthManager";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

// No need for custom GoogleResponse interface since we can use the existing GoogleLoginResponse types

const googleClientId =
  "708779968793-gpjf8o61e2ntb623f3h70kpnvcckstvo.apps.googleusercontent.com";
// const GOOGLE_CLIENT_ID =
//   "2151801682-q5dg4kda9v47of38d3tmk8cs2b57veqr.apps.googleusercontent.com";

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();
  console.log(googleClientId);
  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    // Check if the response contains profileObj (this means it's a valid Google login response)
    if ("profileObj" in response) {
      const { tokenId, profileObj } = response;
      const userName = profileObj.name;
      const userRole = "Guest";

      AuthManager.loginWithGoogle(tokenId, userName, userRole);
      navigate("/display");
    } else {
      console.error("Google login offline response", response);
      alert("Google login failed or user is offline.");
    }
  };

  const onFailure = (error: Error) => {
    console.error("Google Login Failed:", error);
    // alert("Google Login failed. Please try again.");
  };

  return (
    <GoogleLogin
      clientId={googleClientId}
      buttonText="Sign in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginButton;
