import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image } from "expo-image";

export default function ChatRoomHeader({ user, router }) {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#fcfff5",
          shadowColor: "transparent",
        },
        headerLeft: () => (
          <View className="flex-row items-center gap-4 ">
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={hp(4)} color="#728156" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <Image
                source={user?.profileUrl}
                style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
              />
              <Text
                style={{ fontSize: hp(2) }}
                className="font-semibold text-black "
              >
                {user?.name}
              </Text>
            </View>
          </View>
        ),

        headerRight: () => (
          <View className="flex-row items-center gap-4">
            <Ionicons name="call" size={hp(2.8)} color="#728156" />
            <Ionicons name="videocam" size={hp(2.8)} color="#728156" />
          </View>
        ),
      }}
    />
  );
}
