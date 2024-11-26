import { View, Text, Platform } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image, ImageBackground } from "expo-image";
import { blurhash } from "../utils/common";
import { useAuth } from "@/context/authContext";
const ios = Platform.OS === "ios";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import MenuItem from "./CustomMenu";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
export default function HomeHeader() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { logout, user } = useAuth();
  const handleProfile = () => {
    router.replace({ pathname: "/userProfile" });
  };
  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className="flex-row justify-between px-7 pb-6 bg-[#728156] shadow-lg"
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-bold text-white">
          Chats
        </Text>
      </View>

      <View>
        <Menu>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {
                // padding: 10, // Add padding for better click area
                // elevation: 5, // For Android shadow
              },
            }}
          >
            <Image
              source={user?.profileUrl}
              style={{
                height: hp(5),
                width: hp(5),
                borderRadius: 100,
                borderWidth: 2,
                borderColor: "#fff",
              }}
              placeholder={blurhash}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: "continuous",
                marginTop: 40,
                marginLeft: -30,
                backgroundColor: "#ffffff",
                padding: 5,
                shadowOpacity: 0.5,
                shadowOffset: { width: 0, height: 0 },
                width: wp(50),
              },
            }}
          >
            <MenuItem
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
            />
            <Divider />
            <MenuItem
              text="Sign Out"
              action={handleLogout}
              value={null}
              icon={
                <MaterialIcons name="logout" size={hp(2.5)} color="#737373" />
              }
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}
const Divider = () => {
  return <View className="border-t w-full border-neutral-300" />;
};
