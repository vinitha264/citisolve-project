import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user on page load (important for OAuth)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://oauth-backend-2-fm7v.onrender.com/api/auth/user",
          {
            credentials: "include", // very important for cookies
          }
        );

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch(
        "https://oauth-backend-2-fm7v.onrender.com/api/auth/logout",
        {
          method: "GET",
          credentials: "include",
        }
      );
      setUser(null);
    } catch (err) {
      console.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};