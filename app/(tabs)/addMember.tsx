import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase/firebaseConfig";

const AddMemberScreen = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [userImage, setUserImage] = useState<string | null>(null);
  const [idCardImage, setIdCardImage] = useState<string | null>(null);

  // Pick Image
  const pickImage = async (type: "user" | "id") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      if (type === "user") setUserImage(result.assets[0].uri);
      else setIdCardImage(result.assets[0].uri);
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (uri: string, path: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const handleSave = async () => {
    if (!name || !phone) {
      Alert.alert("Error", "Name and Phone are required");
      return;
    }

    try {
      let userImageUrl = "";
      let idCardUrl = "";

      if (userImage) {
        userImageUrl = await uploadImage(
          userImage,
          `members/user_${Date.now()}`
        );
      }

      if (idCardImage) {
        idCardUrl = await uploadImage(
          idCardImage,
          `members/id_${Date.now()}`
        );
      }

      await addDoc(collection(db, "members"), {
        name,
        phone,
        email,
        dob,
        gender,
        bloodGroup,
        address,
        notes,
        userImageUrl,
        idCardUrl,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Member added successfully");
      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>New Member</Text>

        <TextInput
          placeholder="Enter name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <View style={styles.row}>
          <View style={styles.codeBox}>
            <Text>+91</Text>
          </View>
          <TextInput
            placeholder="Phone"
            style={[styles.input, { flex: 1 }]}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Address"
          style={[styles.input, { height: 80 }]}
          value={address}
          onChangeText={setAddress}
          multiline
        />

        <TextInput
          placeholder="Notes"
          style={[styles.input, { height: 100 }]}
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        {/* Images */}
        <View style={styles.imageRow}>
          <TouchableOpacity
            style={styles.imageBox}
            onPress={() => pickImage("user")}
          >
            {userImage ? (
              <Image source={{ uri: userImage }} style={styles.image} />
            ) : (
              <Text>No User Image</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageBox}
            onPress={() => pickImage("id")}
          >
            {idCardImage ? (
              <Image source={{ uri: idCardImage }} style={styles.image} />
            ) : (
              <Text>No ID Card</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Add new member</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMemberScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6F8" },
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 20 },
  input: {
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 12,
  },
  row: { flexDirection: "row", gap: 10 },
  codeBox: {
    width: 70,
    height: 50,
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  imageBox: {
    width: "48%",
    height: 120,
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#0A1E5E",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: { color: "#FFF", fontWeight: "600", fontSize: 16 },
});