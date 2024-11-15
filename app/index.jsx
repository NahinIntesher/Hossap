import { Link } from "expo-router";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const [isFirstTime, setIsFirstTime] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
        if (hasSeenOnboarding) {
          setIsFirstTime(false);
          router.push("/logIn"); // Redirect to login if onboarding already seen
        } else {
          setIsFirstTime(true);
          setLoaded(true); // Render the onboarding screen
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };
    checkFirstTime();
  }, []);

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      setIsFirstTime(false);
      router.replace("/signUp"); // Navigate to sign-up after onboarding
    } catch (error) {
      console.error("Error setting onboarding status:", error);
    }
  };

  if (isFirstTime === null) {
    return null; // Optionally, a loading indicator can be placed here
  }

  if (isFirstTime && isLoaded) {
    return (
      <View className="flex-1 p-8 justify-center items-center">
        <Image
          source={require("../assets/images/welcomeImage.png")}
          style={{ width: 250, height: 250 }}
          className="rounded-3xl border-gray-100 mb-5"
          resizeMode="contain"
        />
        <Text className="text-4xl text-black font-bold text-center mb-4">
          Welcome to Hossap
        </Text>
        <Text className="text-lg text-black text-center mb-8">
          Stay connected with friends and family, chat anytime, anywhere. Let's get started!
        </Text>
        <TouchableOpacity
          className="bg-[#6c63ff] py-4 px-8 rounded-full"
          onPress={handleContinue}
        >
          <Text className="text-white text-lg font-bold">Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null; // Or a fallback/loading screen if necessary
}
