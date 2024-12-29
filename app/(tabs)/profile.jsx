import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useAuth();

  const Menu = [
    {
      id: 1,
      name: "Add New Pet",
      icon: "add-circle",
      path: "/add-new-pet",
    },
    {
      id: 2,
      name: "Favorite",
      icon: "heart",
      path: "/(tabs)/favorite",
    },
    {
      id: 3,
      name: "Logout",
      icon: "exit",
      path: "logout",
    },
  ];

  const onPressMenu = (menu) => {
    if (menu.path === "logout") {
      signOut();
      router.push("/login");
      return;
    }
    router.push(menu.path);
  };

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>Profile</Text>
      <View
        style={{ display: "flex", alignItems: "center", marginVertical: 25 }}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 99,
          }}
        />
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
          {user?.fullName}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 16,
            color: Colors.GRAY,
            marginTop: 6,
          }}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <FlatList
        data={Menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => onPressMenu(item)}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
                backgroundColor: Colors.WHITE,
                padding: 10,
                borderRadius: 10,
                gap: 10,
                marginBottom: 20,
              }}>
              <Ionicons
                name={item.icon}
                size={24}
                color={Colors.PRIMARY}
                style={{
                  padding: 10,
                  backgroundColor: Colors.LIGHT,
                  borderRadius: 8,
                  marginRight: 10,
                }}
              />
              <Text style={{ fontFamily: "outfit-medium", fontSize: 16 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Profile;
