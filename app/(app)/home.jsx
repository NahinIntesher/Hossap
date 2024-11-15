import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router"; // Import useRouter for navigation

export default function Home() {
  const { logout, user } = useAuth();
  const router = useRouter(); // Initialize router

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const chatList = [
    {
      id: "1",
      name: "John Doe",
      message: "Hey, how are you?",
      timestamp: "2:30 PM",
      avatar: "https://example.com/avatar1.png",
    },
    {
      id: "2",
      name: "Jane Smith",
      message: "Looking forward to our meeting!",
      timestamp: "1:15 PM",
      avatar: "https://example.com/avatar2.png",
    },
    {
      id: "3",
      name: "Alex Johnson",
      message: "Can you send me the files?",
      timestamp: "Yesterday",
      avatar: "https://example.com/avatar3.png",
    },
  ];

  const handleChatPress = (chatUser) => {
    router.push({
      pathname: "/oneToOneChat",
      params: { userId: chatUser.id, userName: chatUser.name },
    });
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleChatPress(item)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage}>{item.message}</Text>
      </View>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={["#f5f7fa", "#c3cfe2"]} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chats</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={chatList}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#a023ff",
  },
  headerTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: "#0165ad",
    padding: 8,
    borderRadius: 10,
  },
  chatList: {
    padding: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  chatMessage: {
    fontSize: 14,
    color: "#666",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
});
