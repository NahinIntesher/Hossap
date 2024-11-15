import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useSearchParams } from "expo-router"; // Import useSearchParams for accessing params
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";

export default function oneToOneChat() {
  // const { userId, userName } = useSearchParams();
  const { user } = useAuth();
  const userId = "1"; // Replace with the actual user ID
  const userName = "Nahin"; // Replace with the actual user name
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey! How are you?", sender: "other" },
    { id: "2", text: "I am good, thanks! What about you?", sender: "me" },
    {
      id: "3",
      text: "Doing great. Any plans for the weekend?",
      sender: "other",
    },
    { id: "4", text: "Thinking of going hiking. You?", sender: "me" },
    {
      id: "5",
      text: "Sounds fun! I might join you if that's okay.",
      sender: "other",
    },
    { id: "6", text: "Of course! The more, the merrier.", sender: "me" },
    { id: "7", text: "Great! I'll bring snacks.", sender: "other" },
    { id: "8", text: "Perfect. Let's meet at 8 AM.", sender: "me" },
    { id: "9", text: "Sure! See you then.", sender: "other" },
    { id: "10", text: "Do you need a ride?", sender: "me" },
    {
      id: "11",
      text: "No, I'll drive myself. Thanks, though!",
      sender: "other",
    },
    { id: "12", text: "Alright, see you there!", sender: "me" },
    {
      id: "13",
      text: "Hey, one more thing. Should I bring my camera?",
      sender: "other",
    },
    { id: "14", text: "Yes, that would be great for pictures!", sender: "me" },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: inputText, sender: "me" },
      ]);
      setInputText("");
    }
  };

  const renderMessageItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me" ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat with {userName}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f7fa",
  },
  header: {
    padding: 15,
    backgroundColor: "#a023ff",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  chatList: {
    // flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: "70%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#a023ff",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#979797",
  },
  messageText: {
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#a023ff",
    padding: 10,
    borderRadius: 20,
  },
});
