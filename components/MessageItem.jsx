import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function MessageItem({ message, currentUser }) {
  if (currentUser?.uid === message?.userId) {
    return (
      <View className="flex-row justify-end mb-1 mr-3 px-2">
        <View style={{ width: wp(80) }}>
          <View className="flex self-end p-3 rounded-2xl bg-[#fcfff5] border border-neutral-300">
            <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ width: wp(80) }} className="ml-5 mb-1">
        <View className="flex self-start p-3 rounded-2xl bg-[#e5f6be] border border-neutral-300">
          <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
        </View>
      </View>
    );
  }
}
