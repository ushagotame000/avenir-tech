import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthManager } from "../services/AuthManager";

//d authcontex
interface AuthContextProps {
  isLoggedIn: boolean;
  userRole: string | null;
  userName: string | null;
  login: (name: string, password: string) => void;
  logout: () => void;
}

// D type
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// context valus
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthManager.isLoggedIn());
  const [userRole, setUserRole] = useState<string | null>(
    AuthManager.getUserRole()
  );
  const [userName, setUserName] = useState<string | null>(
    AuthManager.getUserName()
  );

  useEffect(() => {
    setIsLoggedIn(AuthManager.isLoggedIn());
    setUserRole(AuthManager.getUserRole());
    setUserName(AuthManager.getUserName());
  }, [isLoggedIn]);

  const login = (name: string, password: string) => {
    AuthManager.login(name, password);
    setIsLoggedIn(true);
    setUserRole(AuthManager.getUserRole());
    setUserName(AuthManager.getUserName());
  };

  const logout = () => {
    AuthManager.logout();
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName(null);
  };
  const contextValue = {
    isLoggedIn,
    userRole,
    userName,
    login,
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
