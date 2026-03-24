import { createClient } from "@supabase/supabase-js";
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

const AddMemberScreen = () => {
  debugger;
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


  const handleSave = async () => {
    debugger;
    if (!name || !phone) {
      Alert.alert("Error", "Name and Phone are required");
      return;
    }

    try {
      let userImageUrl = "";
      let idCardUrl = "";

      const supabaseUrl = "https://vihsrmhbzlejvueultdq.supabase.co";
      const supabaseKey = "sb_publishable_HMy-TLDNjSGsWNrgFIRhHw_O_0wJjYb";
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase.rpc("ufn_create_member", {
        in_member_code: `MBR_${Date.now()}`, // generate or pass your own
        in_first_name: name,
        in_last_name: "", // split if needed
        in_gender: gender || "",
        in_dob: dob || null,
        in_phone: phone,
        in_email: email || "",
        in_address: address || "",
        in_city: "",       // fill if available
        in_state: "",      // fill if available
        in_pincode: "",    // fill if available
        in_membership_type: "REGULAR", // or dynamic
        in_height: null,   // pass number if available
        in_weight: null,
        in_emg_name: "",
        in_emg_phone: "",
      });

      if (error) {
        console.log("Supabase error:", error);
        alert(error);
        return;
      }
      debugger;
      console.log("Success:", data);
      alert(data);
      router.back();
    } catch (err) {
      console.log("Unexpected error:", err);
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