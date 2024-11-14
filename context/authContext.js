import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const login = async (email, password) => {
    // Implement the login functionality here
    try {
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    // Implement the logout functionality here
    try {
    } catch (error) {
      console.log(error);
    }
  };
  const register = async (name, email, password) => {
    try {
      // Implement the registration functionality here
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("response.user: " + response?.user);

      await setDoc(doc(db, "users", response?.user?.uid), {
        name,
        profileUrl: "",
        userId: response?.user?.uid,
      });
      return { success: true, user: response?.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return value;
};
