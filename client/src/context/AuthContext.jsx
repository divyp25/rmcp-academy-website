import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API } from "../assets/constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Check if the user is logged in
  useEffect(() => {
    axios
      .get(`${API}/api/auth`, { withCredentials: true })
      .then((res) => {
        if (res.status !== 200) throw new Error("Unauthorized");
        setAdmin(res.data);
      })
      .catch(() => {
        setAdmin(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    try {
      await axios
        .post(
          `${API}/api/auth/login`,
          { email, password },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Unauthorized");
          }
          setAdmin(res.data);
          navigate("/admin");
          toast.success("Login successful");
        });
    } catch (error) {
      toast.error("Invalid Credentials!");
      console.error(error);
    }
  };

  const logout = async () => {
    await axios.post(`${API}/api/auth/logout`, {}, { withCredentials: true });
    setAdmin(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
