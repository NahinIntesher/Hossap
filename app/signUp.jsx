import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useRef } from "react";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Loading from "@/components/Loading";

export default function SignUp() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [showPassword, setShowPassword] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  // Add error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOutsidePress = () => {
    setIsInputFocused(false);
    Keyboard.dismiss();
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
  const handleSignUp = () => {
    const isEmailValid = validateEmail(emailRef.current);
    const isPasswordValid = validatePassword(passwordRef.current);

    if (isEmailValid && isPasswordValid) {
      setLoading(true);
      // Proceed with sign up
      Alert.alert("Success", "Sign up successful!");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View className="flex-1">
        <StatusBar style="auto" />
        <View
          style={{ paddingTop: hp(8), paddingHorizontal: wp(7) }}
          className="flex-1"
        >
          {/* Signup Image */}
          {!isInputFocused && (
            <View className="items-center">
              <Image
                style={{ height: hp(25) }}
                resizeMode="contain"
                source={require("../assets/images/signupImage.png")}
              />
            </View>
          )}
          <View className="mb-2">
            <Text className="text-3xl text-center">Create Account</Text>
            <Text className="text-md text-center">Sign up to get started</Text>
          </View>

          {/* Form Inputs */}
          <View className="gap-2">
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
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </View>
            </View>

            {/* Email Input */}
            <View className="flex flex-col">
              <Text className="text-lg">Email</Text>
              <View
                style={{ height: hp(7) }}
                className={`flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl border "border-neutral-500`}
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
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </View>
              {isInputFocused && emailError && (
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
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>
              {isInputFocused && passwordError && (
                <Text style={{ color: "#ff3d3d" }} className="text-xs mt-1">
                  {passwordError}
                </Text>
              )}

              {/* Sign Up Button */}
              <View className="flex flex-col items-center">
                {loading ? (
                  <Loading size={hp(13)} />
                ) : (
                  <TouchableOpacity
                    className="w-full bg-[#6c63ff] items-center mt-4 rounded-lg py-5"
                    onPress={handleSignUp}
                  >
                    <Text className="text-white text-xl font-bold">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Login Link */}
              <View className="flex flex-row justify-center mt-2">
                <Text className="text-md">Already have an account? </Text>
                <Link href={"/logIn"}>
                  <Text
                    style={{ color: "#6c63ff" }}
                    className="text-md font-bold"
                  >
                    Login
                  </Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
