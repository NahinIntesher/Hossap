import { FlatList, View, Text } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";

const ChatList = ({ currentUser, users }) => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-[#fcfff5]">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            noBorder={index + 1 === users.length}
            router={router}
            currentUser={currentUser}
            item={item}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default ChatList;