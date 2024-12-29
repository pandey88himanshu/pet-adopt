import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import PetSubInfoCard from "./PetSubInfoCard";

const PetSubInfo = ({ pet }) => {
  return (
    <View style={{ padding: 20 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <PetSubInfoCard
          icon={require("../../assets/images/calendar.png")}
          title={"Age"}
          value={pet?.age + " YRS"}
        />
        <PetSubInfoCard
          icon={require("../../assets/images/bone.png")}
          title={"Breed"}
          value={pet?.breed}
        />
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <PetSubInfoCard
          icon={require("../../assets/images/sex.png")}
          title={"Sex"}
          value={pet?.sex}
        />
        <PetSubInfoCard
          icon={require("../../assets/images/weight.png")}
          title={"Weight"}
          value={pet?.weight + " Kg"}
        />
      </View>
    </View>
  );
};

export default PetSubInfo;
