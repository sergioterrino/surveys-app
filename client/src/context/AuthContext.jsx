import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, signupRequest, tokenAuthRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuthRequest(token)
      .then(response => {
        setUser(response.data);
        console.log("AuthContext - useEffect - response.data -> ", response.data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        console.log('authContext - useEffect - Token is not valid');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      });
    }
  }, []);

  const signup = async (data) => {
    try {
      const res = await signupRequest(data);
      console.log("res after signup -> ", res);
      if (res.status === 200) {
        console.log("User Register successfully - after signup -> ", res.data);
      }
    } catch (error) {
      console.log('Registration error: ', error);
      throw error;
    }
  };

  const login = async (data) => {
    try {
      const res = await loginRequest(data);
      console.log("res despues de login() -> ", res);
      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        console.log("User logged in successfully -> isAuth", isAuthenticated);
      }
      return res;
    } catch (error) {
      console.log("Login error -> ", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{user, login, signup, logout, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};
