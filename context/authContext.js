import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router"; // Import useRouter

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const userDoc = await getDoc(doc(db, "users", user.uid)); // Fetch user data from Firestore
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: user.uid,
            email: user.email,
            name: userData?.name || "Default Name", // Default name if name is not found
            profileUrl: userData?.profileUrl || "", // Default empty string if profileUrl doesn't exist
          });
        } else {
          setUser({
            uid: user.uid,
            email: user.email,
          });
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, user: response?.user };
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid Email";
      }
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (name, email, password, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("response.user: " + response?.user);

      await setDoc(doc(db, "users", response?.user?.uid), {
        name,
        profileUrl,
        userId: response?.user?.uid,
      });

      setUser(response.user);
      setIsAuthenticated(true);

      return { success: true, user: response?.user };
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid Email";
      }
      return { success: false, message: msg };
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
