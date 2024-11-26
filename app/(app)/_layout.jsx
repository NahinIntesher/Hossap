import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HomeHeader from "@/components/HomeHeader";

export default function _layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            header: () => <HomeHeader />,
          }}
        />
        {/* <Stack.Screen
          name="oneToOneChat"
          options={{
            headerShown: false,
            // contentStyle: { backgroundColor: "#a023ff" },
          }}
        /> */}
      </Stack>
    </SafeAreaProvider>
  );
}
