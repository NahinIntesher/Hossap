import { Link } from "expo-router";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user has seen the onboarding screen before
    const checkFirstTime = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
      if (hasSeenOnboarding) {
        setIsFirstTime(false);
        router.push("/logIn");
      }
      else {
        setLoaded(true);
      }
    };
    checkFirstTime();
  }, []);

  const handleContinue = async () => {
    // Set the flag so the user won't see the onboarding again
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    setIsFirstTime(false);
    router.push("/signUp");
  };

  if(isLoaded) {
    return (

      <View className="flex-1 p-8 justify-center items-center ">
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
          className="bg-[#6c63ff] py-4 px-8 rounded-full"
          onPress={handleContinue}
        >
          <Text className="text-white text-lg font-bold">Get Started</Text>
        </TouchableOpacity>
        <Link href="/logIn" className="mt-4">
          <Text className="text-md">Already have an account? </Text>
  
          <Text style={{ color: "#6c63ff" }} className="text-md font-bold ">
            Login
          </Text>
        </Link>
      </View>
    );
  } 
}
