import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
const OwnerInfo = ({ pet }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}>
        <Image
          source={{ uri: pet?.imageUrl }}
          style={{ width: 50, height: 50, borderRadius: 99 }}
        />
        <View>
          <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
            {pet?.name}
          </Text>
          <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
            Pet Owner
          </Text>
        </View>
      </View>
      <Ionicons name='send' size={24} color={Colors.PRIMARY} />
    </View>
  );
};

export default OwnerInfo;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
    borderColor: Colors.PRIMARY,
  },
});
