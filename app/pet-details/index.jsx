import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import {
  router,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import Colors from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

const index = () => {
  const router = useRouter();
  const { user } = useUser();
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const InitiateChat = async () => {
    const docId1 = user?.primaryEmailAddress?.emailAddress + "_" + pet?.email;
    const docId2 = pet?.email + "_" + user?.primaryEmailAddress?.emailAddress;
    const q = query(
      collection(db, "chat"),
      where("id", "in", [docId1, docId2])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      router.push({
        pathname: "/chat",
        params: { id: doc.id },
      });
    });
    if (querySnapshot.docs?.length == 0) {
      await setDoc(doc(db, "chat", docId1), {
        id: docId1,
        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName,
          },
          {
            email: pet?.email,
            imageUrl: pet?.userImage,
            name: pet?.username,
          },
        ],
      });
      router.push({
        pathname: "/chat",
        params: { id: docId1 },
      });
    }
  };
  return (
    <View>
      <ScrollView>
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPet pet={pet} />
        <OwnerInfo pet={pet} />
        <View style={{ height: 70 }}></View>
      </ScrollView>
      <View style={styles?.bottomConatiner}>
        <TouchableOpacity style={styles.adoptBtn}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              fontSize: 20,
              color: Colors.WHITE,
            }}>
            Adop Me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;
const styles = StyleSheet.create({
  adoptBtn: {
    padding: 15,
    backgroundColor: Colors.SECONDARY,
  },
  bottomConatiner: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});
