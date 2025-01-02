import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthManager } from "../services/AuthManager";

// Define AuthContext interface
interface AuthContextProps {
  isLoggedIn: boolean;
  userRole: string | null;
  useremail: string | null;
  login: (email: string, password: string) => void;
  loginWithGoogle: (
    tokenId: string,
    useremail: string,
    userRole: string
  ) => void;
  logout: () => void;
}

// Define AuthProvider props
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    AuthManager.isLoggedIn()
  );
  const [userRole, setUserRole] = useState<string | null>(
    AuthManager.getUserRole()
  );
  const [useremail, setUseremail] = useState<string | null>(
    AuthManager.getUseremail()
  );

  // Sync state with AuthManager changes
  useEffect(() => {
    setIsLoggedIn(AuthManager.isLoggedIn());
    setUserRole(AuthManager.getUserRole());
    setUseremail(AuthManager.getUseremail());
  }, []);

  // Login using useremail and password
  const login = (email: string, password: string) => {
    try {
      AuthManager.login(email, password);
      setIsLoggedIn(true);
      setUserRole(AuthManager.getUserRole());
      setUseremail(AuthManager.getUseremail());
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Login with Google
  const loginWithGoogle = (
    tokenId: string,
    googleUseremail: string,
    googleUserRole: string
  ) => {
    try {
      AuthManager.loginWithGoogle(tokenId, googleUseremail, googleUserRole);
      setIsLoggedIn(true);
      setUserRole(AuthManager.getUserRole());
      setUseremail(AuthManager.getUseremail());
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  // Logout
  const logout = () => {
    AuthManager.logout();
    setIsLoggedIn(false);
    setUserRole(null);
    setUseremail(null);
  };

  // Context value
  const contextValue: AuthContextProps = {
    isLoggedIn,
    userRole,
    useremail,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
