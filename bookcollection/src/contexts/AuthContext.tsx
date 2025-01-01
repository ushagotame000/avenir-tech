import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthManager } from "../services/AuthManager";

// Define AuthContext interface
interface AuthContextProps {
  isLoggedIn: boolean;
  userRole: string | null;
  userName: string | null;
  login: (name: string, password: string) => void;
  loginWithGoogle: (
    tokenId: string,
    userName: string,
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
  const [userName, setUserName] = useState<string | null>(
    AuthManager.getUserName()
  );

  // Sync state with AuthManager changes
  useEffect(() => {
    setIsLoggedIn(AuthManager.isLoggedIn());
    setUserRole(AuthManager.getUserRole());
    setUserName(AuthManager.getUserName());
  }, []);

  // Login using username and password
  const login = (name: string, password: string) => {
    try {
      AuthManager.login(name, password);
      setIsLoggedIn(true);
      setUserRole(AuthManager.getUserRole());
      setUserName(AuthManager.getUserName());
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Optionally propagate the error
    }
  };

  // Login with Google
  const loginWithGoogle = (
    tokenId: string,
    googleUserName: string,
    googleUserRole: string
  ) => {
    try {
      AuthManager.loginWithGoogle(tokenId, googleUserName, googleUserRole);
      setIsLoggedIn(true);
      setUserRole(AuthManager.getUserRole());
      setUserName(AuthManager.getUserName());
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  // Logout
  const logout = () => {
    AuthManager.logout();
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName(null);
  };

  // Context value
  const contextValue: AuthContextProps = {
    isLoggedIn,
    userRole,
    userName,
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
