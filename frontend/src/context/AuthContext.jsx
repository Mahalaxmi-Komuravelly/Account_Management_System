import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axiosInstance.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const signup = async (name, email, password) => {
    return await api.post("/api/auth/signup", {
      name,
      email,
      password
    });
  };

  const login = async (email, password) => {
    const response = await api.post("/api/auth/login", {
      email,
      password
    });

    const { id, email: userEmail, token } = response.data.data;

    const userData = { id, email: userEmail };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);

    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);