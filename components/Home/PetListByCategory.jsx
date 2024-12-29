import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetListItem from "./PetListItem";

const PetListByCategory = () => {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    GetPetList("Dogs");
  }, []);
  const GetPetList = async (category) => {
    setLoader(true);
    setPetList([]);
    const q = query(
      collection(db, "pets"),
      where("category", "==", category ? category : "Dogs")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setPetList((petList) => [...petList, doc.data()]);
    });
    setLoader(false);
  };
  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      <FlatList
        style={{ marginTop: 10 }}
        data={petList}
        horizontal={true}
        refreshing={loader}
        onRefresh={() => GetPetList("Dogs")}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
      />
    </View>
  );
};

export default PetListByCategory;
