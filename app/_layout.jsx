import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css"; // Ensure your Tailwind setup works correctly here
import { AuthContextProvider, useAuth } from "../context/authContext";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;

    const inApp = segments[0] === "(app)";
    if (isAuthenticated && !inApp) {
      // User is authenticated but not in the main app section
      router.replace("home");
    } else if (isAuthenticated === false) {
      // User is not authenticated
      router.replace("logIn");
    }
  }, [isAuthenticated, segments, router]);

  return <Slot />;
};

export default function Layout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
