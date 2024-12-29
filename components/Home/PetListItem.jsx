import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import MarkFav from "../PetDetails/MarkFav";

const PetListItem = ({ pet }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: pet,
        })
      }
      style={{
        padding: 10,
        marginRight: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}>
      <View style={{ position: "absolute", zIndex: 10, right: 10, top: 10 }}>
        <MarkFav pet={pet} color={Colors.SECONDARY} />
      </View>
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{
          width: 150,
          height: 135,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />
      <Text style={{ fontFamily: "outfit-medium", fontSize: 18 }}>
        {pet.name}
      </Text>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Text style={{ color: Colors.GRAY, fontFamily: "outfit" }}>
          {pet?.breed}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.WHITE,
            paddingHorizontal: 7,
            paddingVertical: 2,
            borderRadius: 10,
            backgroundColor: Colors.SECONDARY,
            fontSize: 12,
          }}>
          {pet?.age} YRS
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PetListItem;
