import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { GetFavList } from "../../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetListItem from "../../components/Home/PetListItem";

const Favorite = () => {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [loader, setLoader] = useState(false);
  const [favPetList, setFavPetList] = useState([]); // Initialize as an empty array

  useEffect(() => {
    if (user) {
      GetFavPetIds(); // Call the function properly
    }
  }, [user]); // Dependency on user

  const GetFavPetIds = async () => {
    setLoader(true);
    try {
      const result = await GetFavList(user);
      if (result?.favorites?.length) {
        setFavIds(result.favorites);
        GetFavPetList(result.favorites); // Pass favIds to the next function
      } else {
        setFavPetList([]); // No favorites found
      }
    } catch (error) {
      console.error("Error fetching favorite pet IDs:", error.message);
    }
    setLoader(false);
  };

  const GetFavPetList = async (ids) => {
    setLoader(true);
    try {
      const q = query(collection(db, "pets"), where("id", "in", ids));
      const querySnapshot = await getDocs(q);
      const pets = [];
      querySnapshot.forEach((doc) => {
        pets.push(doc.data()); // Collect all pet data
      });
      setFavPetList(pets); // Update the pet list state
    } catch (error) {
      console.error("Error fetching favorite pets:", error.message);
    }
    setLoader(false);
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>
        Favorite
      </Text>
      <FlatList
        data={favPetList}
        onRefresh={GetFavPetIds}
        refreshing={loader}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Favorite;
