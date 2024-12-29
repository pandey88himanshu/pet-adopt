import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "@clerk/clerk-expo";
import { GetFavList, UpdateFav } from "../../Shared/Shared";

const MarkFav = ({ pet, color = "black" }) => {
  const { user, isLoaded, isSignedIn } = useUser(); // Destructure user and its states
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      console.log("User object:", user); // Debug log
      GetFav();
    } else {
      console.log("User not available or not signed in");
    }
  }, [isLoaded, isSignedIn, user]); // Depend on `user` and authentication state

  const GetFav = async () => {
    try {
      // Check if user email is available
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) {
        throw new Error("User email is undefined.");
      }
      const result = await GetFavList(user);
      console.log("Favorites fetched:", result);
      setFavList(result?.favorites || []);
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
    }
  };

  const AddToFav = async () => {
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) {
        throw new Error("User email is undefined.");
      }

      const favResult = [...favList, pet.id]; // Add pet.id to current favorites list
      await UpdateFav(user, favResult); // Update favorites
      GetFav(); // Refresh favorites
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
    }
  };

  const removeFromFav = async () => {
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) {
        throw new Error("User email is undefined.");
      }

      const favResult = favList.filter((item) => item !== pet.id); // Remove pet.id from list
      await UpdateFav(user, favResult); // Update favorites
      GetFav(); // Refresh favorites
    } catch (error) {
      console.error("Error removing from favorites:", error.message);
    }
  };

  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable onPress={() => removeFromFav()}>
          <Ionicons name='heart' size={30} color='red' />
        </Pressable>
      ) : (
        <Pressable onPress={() => AddToFav()}>
          <Ionicons name='heart-outline' size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
};

export default MarkFav;
