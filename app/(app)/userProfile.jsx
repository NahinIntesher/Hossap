import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router"; // Assuming you're using expo-router for navigation
import { hp, wp } from "react-native-responsive-screen"; // Optional: for responsive design

export default function Profile() {
  const { user, logout } = useAuth();  // Get user details from context
  const router = useRouter();  // For navigation

  // Function to handle logout
  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          logout(); // Call logout function from context
          router.push("/login");  // Navigate to login screen
        },
      },
    ]);
  };

  if (!user) {
    // If user is not logged in, show loading or an appropriate message
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center bg-gray-100 p-5">
      {/* Profile Picture */}
      <View className="mb-6">
        <Image 
          source={{ uri: user.profileUrl }} 
          className="w-30 h-30 rounded-full border-2 border-gray-300 mb-4" 
        />
      </View>

      {/* User Details */}
      <View className="items-center mb-6">
        <Text className="text-xl font-bold text-black">{user.name}</Text>
        <Text className="text-base text-gray-500">{user.email}</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        onPress={handleLogout} 
        className="bg-green-400 py-3 px-8 rounded-full mt-6"
      >
        <Text className="text-white text-lg font-semibold text-center">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
