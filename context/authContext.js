import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {

  }, []);

  const login = async (email, password) => {
    // Implement the login functionality here
    try{

    } catch (error) {
      console.log(error);
    }
  }
  const logout = async () => {
    // Implement the logout functionality here
    try{

    } catch (error) {
      console.log(error);
    }
  }
  const register = async (name, email, password) => {
    // Implement the registration functionality here
    try{

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if(!value){
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return value;
}