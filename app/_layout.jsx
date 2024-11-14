import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import "../global.css"; // Ensure your Tailwind setup works correctly here

export default function Layout() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Slot />
    </SafeAreaView>
  );
}
