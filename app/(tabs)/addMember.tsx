import DateTimePicker from "@react-native-community/datetimepicker";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const AddMemberScreen = () => {
  const router = useRouter();

  // Basic
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // DOB
  const [dob, setDob] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [gender, setGender] = useState<"Male" | "Female">("Male");

  // Address
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");

  // Extra
  const [membershipType, setMembershipType] = useState("REGULAR");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  // Emergency
  const [emgName, setEmgName] = useState("");
  const [emgPhone, setEmgPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name || !phone) {
      alert("Name and Phone are required");
      return;
    }

    if (phone.length < 10) {
      alert("Enter valid phone number");
      return;
    }

    try {
      Keyboard.dismiss();
      setLoading(true);

      const userId = `${(Date.now() % 10000)
        .toString()
        .padStart(4, "0")}`;
            const supabaseUrl = "https://vihsrmhbzlejvueultdq.supabase.co";
            const supabaseKey = "sb_publishable_HMy-TLDNjSGsWNrgFIRhHw_O_0wJjYb";
            const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase.rpc("ufn_create_member_v1", {
        in_applicationuserid: userId,

        in_first_name: name,
        in_last_name: lastName || "",

        in_gender: gender,
        in_dob: dob || null,

        in_phone: phone,
        in_email: email || "",

        in_address: address || "",
        in_city: city || "",
        in_state: stateName || "",
        in_pincode: pincode || "",

        in_membership_type: membershipType,

        in_height: height ? Number(height) : null,
        in_weight: weight ? Number(weight) : null,

        in_emg_name: emgName || "",
        in_emg_phone: emgPhone || "",
      });

      if (error) {
        alert( error.message);
        return;
      }

      alert(data?.message);
      router.back();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>New Member</Text>

        {/* Name */}
        <TextInput
          placeholder="First Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Last Name"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        {/* Phone */}
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

        {/* Email */}
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* DOB (Cross Platform) */}
        {Platform.OS === "web" ? (
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={{
              height: 50,
              borderRadius: 10,
              padding: 10,
              marginTop: 12,
              border: "none",
              backgroundColor: "#E6EAF0",
            }}
          />
        ) : (
          <>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: dob ? "#000" : "#9CA3AF" }}>
                {dob || "Select Date of Birth"}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dob ? new Date(dob) : new Date()}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDob(selectedDate.toISOString().split("T")[0]);
                  }
                }}
              />
            )}
          </>
        )}

        {/* Address */}
        <TextInput
          placeholder="Address"
          style={[styles.input, { height: 80 }]}
          value={address}
          onChangeText={setAddress}
          multiline
        />

        <TextInput
          placeholder="City"
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />

        <TextInput
          placeholder="State"
          style={styles.input}
          value={stateName}
          onChangeText={setStateName}
        />

        <TextInput
          placeholder="Pincode"
          style={styles.input}
          keyboardType="numeric"
          value={pincode}
          onChangeText={setPincode}
        />

        {/* Membership */}
        <TextInput
          placeholder="Membership Type"
          style={styles.input}
          value={membershipType}
          onChangeText={setMembershipType}
        />

        {/* Health */}
        <TextInput
          placeholder="Height (cm)"
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <TextInput
          placeholder="Weight (kg)"
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        {/* Emergency */}
        <TextInput
          placeholder="Emergency Contact Name"
          style={styles.input}
          value={emgName}
          onChangeText={setEmgName}
        />

        <TextInput
          placeholder="Emergency Contact Phone"
          style={styles.input}
          keyboardType="phone-pad"
          value={emgPhone}
          onChangeText={setEmgPhone}
        />

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Saving..." : "Add New Member"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMemberScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6F8" },
  container: { padding: 20 },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: "center",
    marginTop: 12,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  codeBox: {
    width: 70,
    height: 50,
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  button: {
    backgroundColor: "#0A1E5E",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});