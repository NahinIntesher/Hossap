import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { blurhash, formatDate } from "@/utils/common";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../context/authContext";
import { getRoomId } from "../utils/common";
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
import { db } from "../firebaseConfig";

const ChatItem = ({ currentUser, item, index, noBorder, router }) => {
  const [lastMessage, setLastMessage] = useState(undefined);

  useEffect(() => {
    let roomId = getRoomId(currentUser?.uid, item?.userId);

    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });

    return unsub;
  }, []);

  // console.log("lastMessage", lastMessage);
  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };

  const renderTime = () => {
    if (lastMessage && lastMessage.createdAt) {
      let date = lastMessage.createdAt;

      // If createdAt is in Firestore timestamp format
      if (date.seconds) {
        date = new Date(date.seconds * 1000); // Convert to JavaScript Date object
      }

      // Get the formatted date (e.g., "15 Nov" or "Today")
      const formattedDate = formatDate(date);

      // Get the formatted time (e.g., "10:45 AM")
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Return both date and time
      return { date: formattedDate, time: formattedTime };
    }

    // Default return if lastMessage or createdAt is undefined
    return { date: "No date", time: "" };
  };

  const renderLastMessage = () => {
    if (typeof lastMessage === "undefined") return "Loading...";
    if (lastMessage) {
      if (currentUser?.uid === lastMessage?.userId) {
        return `You: ${lastMessage?.text}`;
      }
      return lastMessage?.text;
    } else {
      return "Say Hi 🙋";
    }
  };

  return (
    <TouchableOpacity
      onPress={openChatRoom}
      className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-4 ${
        noBorder ? "" : "border-b border-b-neutral-300"
      }`}
    >
      <Image
        source={item?.profileUrl}
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
        placeholder={blurhash}
        transition={500}
      />
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between items-center">
          <Text style={{ fontSize: hp(1.8) }} className="font-bold text-black">
            {item?.name}
          </Text>

          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Text
              style={{ fontSize: hp(1.3) }}
              className="text-neutral-600 mr-1"
            >
              {renderTime().date}
            </Text>
            <Text
              style={{ fontSize: hp(1.2) }}
              className="text-neutral-500 mr-1"
            >
              {renderTime().time}
            </Text>
          </View>
        </View>

        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-light text-xs text-neutral-500"
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
