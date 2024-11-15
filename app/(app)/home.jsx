import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#f5f7fa", "#c3cfe2"]} style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>Welcome</Text>
            <Text style={styles.headerTitle}>{user?.name || "User"}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "#00ff51",
  },
  headerTitle: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#ff1e00",
    padding: 10,
    borderRadius: 15,
  },
});
