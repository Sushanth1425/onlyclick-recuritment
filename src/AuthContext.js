import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider= ({children}) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setUser({token});
    }
  }, []);
  const login = (token,userData) => {
    sessionStorage.setItem("token", token)
    sessionStorage.setItem("user", JSON.stringify(userData))
    setUser({token, ...userData});
  };
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)