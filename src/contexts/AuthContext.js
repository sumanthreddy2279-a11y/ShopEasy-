import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};