import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

export const GetFavList = async (user) => {
  if (!user?.primaryEmailAddress?.emailAddress) {
    throw new Error("User email is undefined.");
  }

  const userEmail = user.primaryEmailAddress.emailAddress;
  const docRef = doc(db, "userFavPet", userEmail);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      await setDoc(docRef, {
        email: userEmail,
        favorites: [],
      });
      return { email: userEmail, favorites: [] }; // Return the new document structure
    }
  } catch (error) {
    console.error("Error fetching or creating favorite list:", error);
    throw error;
  }
};

export const UpdateFav = async (user, favorites) => {
  if (!user?.primaryEmailAddress?.emailAddress) {
    throw new Error("User email is undefined.");
  }

  const userEmail = user.primaryEmailAddress.emailAddress;
  const docRef = doc(db, "userFavPet", userEmail);

  try {
    await updateDoc(docRef, { favorites });
    console.log("Favorites updated successfully.");
  } catch (error) {
    console.error("Error updating favorites:", error);
    throw error;
  }
};
