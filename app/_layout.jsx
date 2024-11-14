import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import "../global.css"; // Ensure your Tailwind setup works correctly here

const MainLayout = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Slot />
    </SafeAreaView>
  );
};

export default function Layout() {
  return <MainLayout />;
}
