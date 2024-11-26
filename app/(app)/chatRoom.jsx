import { View, Text, TouchableOpacity, Alert, Keyboard } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import MessageList from "@/components/MessageList";
import { TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { useAuth } from "../../context/authContext";
import { getRoomId } from "../../utils/common";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function ChatRoom() {
  const item = useLocalSearchParams(); // second user
  const { user } = useAuth(); // currently logged in user
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef("");
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    updateScrollView();
    updateKeyboardScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }, 100);
  };
  const updateKeyboardScrollView = () => {
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    CreateRoomIfNotExists();

    let roomId = getRoomId(user?.uid, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => updateKeyboardScrollView()
    );

    return () => {
      unsub();
      keyboardDidShowListener.remove();
    };
  }, []);

  const CreateRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.uid, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };
  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;

    try {
      // console.log("Room ID:", roomId);
      let roomId = getRoomId(user?.uid, item?.userId);
      let docRef = doc(db, "rooms", roomId);
      let messageRef = collection(docRef, "messages");

      textRef.current = "";
      if (inputRef) inputRef?.current.clear();

      const newDoc = await addDoc(messageRef, {
        userId: user?.uid,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.name,
        createdAt: Timestamp.fromDate(new Date()),
      });

      // console.log("Document written with ID: ", newDoc.id);
    } catch (e) {
      // console.error("Error adding document: ", e);
      Alert.alert("Error", e.message);
    }
  };

  return (
    // <CustomKeyboardView inChat={true}>
    <View className="flex-1 bg-[#fcfff5] ">
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View className="h-3 border-b border-b-neutral-400"></View>
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessageList
            scrollViewRef={scrollViewRef}
            messages={messages}
            currentUser={user}
          />
        </View>

        <View style={{ marginBottom: hp(2) }} className="pt-2">
          <View className="flex-row mx-3 justify-between items-center gap-3 bg-[#fcfff5] border p-2 border-neutral-300 rounded-full pl-5">
            <TextInput
              ref={inputRef}
              onChangeText={(value) => (textRef.current = value)}
              placeholder="Type message..."
              style={{ fontSize: hp(2) }}
              className="flex-1 mr-2"
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              className="bg-[#cee39f] p-3 mr-1 rounded-full"
            >
              <Feather name="send" size={hp(2.5)} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    // </CustomKeyboardView>
  );
}
