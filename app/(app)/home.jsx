import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState } from "react";
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
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>Welcome</Text>
            <Text style={styles.headerTitle}>{user?.name}</Text>
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
    // paddingTop: 50,
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
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  messageBubbleSent: {
    alignSelf: "flex-end",
    backgroundColor: "#3b5998",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "75%",
  },
  messageBubbleReceived: {
    alignSelf: "flex-start",
    backgroundColor: "#e6e6e6",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "75%",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#3b5998",
    padding: 10,
    borderRadius: 20,
  },
});
