import { useState, useContext, createContext } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
