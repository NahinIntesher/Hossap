import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native";

export default function Index() {
  return (
    <View className="bg-sky-300 p-20">
      <Text className="text-3xl text-center">Home</Text>
    </View>
    // <View className="flex-1 justify-center items-center">
    //   <ActivityIndicator size="large" color="#4e4f4d" />
    // </View>
  );
}
