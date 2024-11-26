import { Link, usePathname, useSegments } from "expo-router";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";

export default function Onboarding() {
  const [isFirstTime, setIsFirstTime] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem(
          "hasSeenOnboarding"
        );
        if (hasSeenOnboarding) {
          setIsFirstTime(false);
          const inApp = segments[0] === "(app)";
          if (typeof isAuthenticated !== "undefined") {
            if (isAuthenticated && !inApp) {
              router.replace("home");
            } else if (isAuthenticated === false) {
              router.replace("logIn");
            }
          }
        } else {
          setIsFirstTime(true);
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      } finally {
        setLoaded(true); // Loading complete
      }
    };

    checkFirstTime();
  }, [isAuthenticated]);

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      setIsFirstTime(false);
      router.replace("logIn"); // Navigate to sign-up after onboarding
    } catch (error) {
      console.error("Error setting onboarding status:", error);
    }
  };

  if (isFirstTime === null) {
    // Show a loading state while determining the onboarding status
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isFirstTime === true) {
    // Show the onboarding screen
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
          Stay connected with friends and family, chat anytime, anywhere. Let's
          get started!
        </Text>
        <TouchableOpacity
          className="bg-[#728156] py-4 px-8 rounded-full"
          onPress={handleContinue}
        >
          <Text className="text-white text-lg font-bold">Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null; // If isFirstTime === false, the router will handle redirection
}
