import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/authContext";

export default function SignUp() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const profileRef = useRef("");

  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // Add error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Password validation function
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must contain at least one special character");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Handle sign up
  const handleSignUp = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("SignUp Error", "Fill all the fields");
      return;
    }

    const isEmailValid = validateEmail(emailRef.current);
    const isPasswordValid = validatePassword(passwordRef.current);

    if (isEmailValid && isPasswordValid) {
      setLoading(true);
      let response = await register(
        nameRef.current,
        emailRef.current,
        passwordRef.current,
        profileRef.current
      );
      setLoading(false);

      console.log("Got Result: " + response);
      if (!response.success) {
        Alert.alert("SignUp Failed", response.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar style="dark" />
        <View style={{ paddingTop: hp(8), paddingHorizontal: wp(7) }}>
          {/* Signup Image */}
          <View className="items-center">
            <Image
              style={{ height: hp(22) }}
              resizeMode="contain"
              source={require("../assets/images/signupImage.png")}
            />
          </View>
          <View className="mb-5">
            <Text className="text-3xl text-center font-bold">
              Create Account
            </Text>
            <Text className="text-md text-center">Sign up to get started</Text>
          </View>

          {/* Form Inputs */}
          <View className="gap-1">
            {/* Name Input */}
            <View className="flex flex-col">
              <Text className="text-lg">Name</Text>
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl border border-neutral-500"
              >
                <Octicons name="person" size={hp(2.7)} color="black" />
                <TextInput
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  onChangeText={(value) => (nameRef.current = value)}
                  placeholder="Enter your name"
                  placeholderTextColor={"gray"}
                />
              </View>
            </View>

            {/* Email Input */}
            <View className="flex flex-col">
              <Text className="text-lg">Email</Text>
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl border border-neutral-500"
              >
                <Octicons name="mail" size={hp(2.7)} color="black" />
                <TextInput
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  onChangeText={(value) => {
                    emailRef.current = value;
                    validateEmail(emailRef.current);
                  }}
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  placeholderTextColor={"gray"}
                />
              </View>
              {emailError && (
                <Text style={{ color: "#ff3d3d" }} className="text-xs mt-1">
                  {emailError}
                </Text>
              )}
            </View>

            {/* Password Input */}
            <View className="flex flex-col">
              <Text className="text-lg">Password</Text>
              <View
                style={{ height: hp(7) }}
                className={`flex-row gap-2 px-4 bg-neutral-100 items-center rounded-xl border "border-neutral-500`}
              >
                <Octicons name="lock" size={hp(2.7)} color="black" />
                <TextInput
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  onChangeText={(value) => {
                    passwordRef.current = value;
                    validatePassword(passwordRef.current);
                  }}
                  placeholder="••••••••••••••"
                  secureTextEntry={!showPassword}
                  placeholderTextColor={"gray"}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={!showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>
              {passwordError && (
                <Text style={{ color: "#ff3d3d" }} className="text-xs mt-1">
                  {passwordError}
                </Text>
              )}
            </View>

            {/* Profile Image Input */}
            <View className="flex flex-col">
              <Text className="text-lg">Profile Image</Text>
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl border border-neutral-500"
              >
                <Octicons name="image" size={hp(2.7)} color="black" />
                <TextInput
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  onChangeText={(value) => (profileRef.current = value)}
                  placeholder="Enter your profile image url"
                  placeholderTextColor={"gray"}
                />
              </View>
            </View>

            {/* Sign Up Button */}
            <View className="flex flex-col items-center">
              {loading ? (
                <Loading size={hp(8)} />
              ) : (
                <TouchableOpacity
                  className="w-full bg-[#728156] items-center mt-4 rounded-lg py-5"
                  onPress={handleSignUp}
                >
                  <Text className="text-white text-xl font-bold">Sign Up</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Login Link */}
            <View className="flex flex-row justify-center mt-4">
              <Text className="text-md">Already have an account? </Text>
              <Link href={"/logIn"}>
                <Text
                  style={{ color: "#728156" }}
                  className="text-md font-bold"
                >
                  Login
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
