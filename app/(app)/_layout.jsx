import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function _layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />{" "}
      {/* Set to 'light' or 'dark' based on your theme */}
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: "#a023ff" },
          }}
        />
        <Stack.Screen
          name="oneToOneChat"
          options={{
            headerShown: false,
            // contentStyle: { backgroundColor: "#a023ff" },
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
