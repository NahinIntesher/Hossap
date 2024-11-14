import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css"; // Ensure your Tailwind setup works correctly here
import { AuthContextProvider, useAuth } from "../context/authContext";

const MainLayout = () => {
  const { isAuthenticatd } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticatd == "undefined") return;
    const inApp = segments[0] === "(app)";
    if (isAuthenticatd && !inApp) {
      router.replace("/(app)/home");
    } else if (isAuthenticatd == false) {
      router.replace("/logIn");
    }
  }, [isAuthenticatd]);

  return <Slot />;
};

export default function Layout() {
  return (
    <AuthContextProvider>
      <MainLayout />;
    </AuthContextProvider>
  );
}
