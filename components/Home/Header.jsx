import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

const Header = () => {
  const { user } = useUser();
  //   console.log(user);
  const FullName = user?.firstName + " " + user?.lastName;
  const Name = user?.fullName;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <View>
        <Text style={{ fontFamily: "outfit", fontSize: 18 }}>Welcome</Text>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 25 }}>
          {FullName || "John Doe" || Name}
        </Text>
      </View>
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 40, height: 40, borderRadius: 100 }}
      />
    </View>
  );
};

export default Header;
