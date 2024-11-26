import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatList from "@/components/ChatList";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { query, where, getDocs } from "firebase/firestore";
import { usersRef } from "../../firebaseConfig";

export default function Home() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, [user]);

  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", user?.uid));

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    setUsers(data);
  };
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex-1 justify-center items-center">
          <FontAwesome5 name="users-slash" size={hp(10)} color="#728156" />
          <Text className="text-xl mt-5 font-semibold">No user found</Text>
        </View>
      )}
    </View>
  );
}
