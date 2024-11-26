import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot, useRouter, useSegments, usePathname } from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { BackHandler } from "react-native";
import { Menu, MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isAuthenticated && pathname === "/home") {
          BackHandler.exitApp(); // Exit app from home screen
          return true; // Prevents navigating back
        }
        return false; // Allow default behavior for other screens
      }
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, [isAuthenticated, pathname]);

  return <Slot />;
};

export default function Layout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}
