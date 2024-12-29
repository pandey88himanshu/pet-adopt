import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { db, storage } from "../../config/FirebaseConfig";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";
const index = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [gender, setGender] = useState();
  const [formData, setFormData] = useState({ category: "Cats", sex: "Male" });
  const [image, setImage] = useState();
  const [loading, SetLoading] = useState(false);
  const navigation = useNavigation();
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    GetCategories();
  }, []);
  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };
  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "category"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    if (Object.keys(formData).length != 8) {
      ToastAndroid.show("Enter All Details", ToastAndroid.SHORT);
      return;
    }
    ToastAndroid.show("Submitted Successfully", ToastAndroid.SHORT);
    router.replace("/(tabs)/home");
  };

  const UploadImage = async () => {
    const resp = await fetch(image);
    const blobImage = await resp.blob();
    const storageRef = ref(storage, "./PetAdopt/" + Date.now() + ".jpg");
    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("file uploadeds");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          clg(downloadUrl);
        });
      });
  };

  const SaveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "pets", docId), {
      ...formData,
      imageUrl: imageUrl,
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      id: docId,
      userImage: user?.imageUrl,
    });
  };
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Add New Pet For Adoption
      </Text>
      <Pressable onPress={imagePicker}>
        <View
          style={{
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            width: 100,
            height: 100,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 90, height: 90, borderRadius: 15 }}
            />
          ) : (
            <MaterialIcons name='pets' size={50} color={Colors.PRIMARY} />
          )}
        </View>
      </Pressable>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          onChangeText={(value) => handleInputChange("name", value)}
          style={styles.input}
          placeholder='Enter Your Pet Name Here'
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <View style={styles.input}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedCategory(itemValue);
              handleInputChange("category", itemValue);
            }}>
            {categoryList.map((category, index) => (
              <Picker.Item
                label={category?.name}
                value={category?.name}
                key={index}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Breed *</Text>
        <TextInput
          onChangeText={(value) => handleInputChange("breed", value)}
          style={styles.input}
          placeholder='Enter Your Pet Breed Here'
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Age *</Text>
        <TextInput
          onChangeText={(value) => handleInputChange("age", value)}
          keyboardType='numeric'
          style={styles.input}
          placeholder='Enter Your Pet Age Here'
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Gender *</Text>
        <View style={styles.input}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue);
              handleInputChange("sex", itemValue);
            }}>
            <Picker.Item label='Male' value='Male' />
            <Picker.Item label='Female' value='Female' />
          </Picker>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Weight *</Text>
        <TextInput
          onChangeText={(value) => handleInputChange("weight", value)}
          keyboardType='numeric'
          style={styles.input}
          placeholder='Enter Your Pet Weight Here'
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Address *</Text>
        <TextInput
          onChangeText={(value) => handleInputChange("address", value)}
          style={styles.input}
          placeholder='Enter Your Pet Address Here'
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet About *</Text>
        <TextInput
          onChangeText={(value) => handleInputChange("about", value)}
          style={styles.input}
          numberOfLines={5}
          multiline={true}
          placeholder='Enter Your Pet About Here'
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text style={{ fontFamily: "outfit-medium", textAlign: "center" }}>
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    borderColor: Colors.SECONDARY,
    borderWidth: 1,

    borderRadius: 7,
    fontFamily: "outfit-medium",
  },
  label: {
    marginVertical: 5,
    fontFamily: "outfit",
  },
  btn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 50,
  },
});
