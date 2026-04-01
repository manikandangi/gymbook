import DateTimePicker from "@react-native-community/datetimepicker";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
import RNPickerSelect from "react-native-picker-select";
const supabase = createClient(
  "https://vihsrmhbzlejvueultdq.supabase.co",
  "sb_publishable_HMy-TLDNjSGsWNrgFIRhHw_O_0wJjYb"
);

export default function AddMemberScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [emgName, setEmgName] = useState("");
  const [emgPhone, setEmgPhone] = useState("");

  const [membershipType, setMembershipType] = useState(null);
  const [membershipData, setMembershipData] = useState([]);
  const [options, setOptions] = useState([]);
  const [customDays, setCustomDays] = useState("");

  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchMembershipTypes();
  }, []);

  const fetchMembershipTypes = async () => {
    try {
      const { data, error } = await supabase.rpc("ufn_get_membership_types");
      if (error) throw error;

      setMembershipData(data);

      const formatted = data.map(item => ({
        label: `${item.membership_name} (${item.duration_days} days)`,
        value: item.membership_type_id
      }));

      setOptions(formatted);
    } catch (err) {
      console.log(err.message);
    }
  };

  /* ================= SELECTED PLAN ================= */
  const selectedPlan = membershipData.find(
    item => item.membership_type_id === membershipType
  );

  /* ================= CLEAR CUSTOM DAYS ================= */
  useEffect(() => {
    setCustomDays("");
  }, [membershipType]);

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (
      !name ||
      !phone ||
      !email ||
      !address ||
      !city ||
      !stateName ||
      !pincode ||
      !membershipType||
      !lastName||
      !height||
      !weight||
      !emgName
    ) {
      alert("All fields are mandatory");
      return;
    }

    if (phone.length < 10 || emgPhone.length < 10) {
      alert("Enter valid phone number");
      return;
    }

    if (selectedPlan?.duration_days === 1 && !customDays) {
      alert("Enter number of days");
      return;
    }

    try {
      Keyboard.dismiss();
      setLoading(true);

      const userId =
        Platform.OS === "web" ? localStorage.getItem("userid") : null;

      const { data, error } = await supabase.rpc("ufn_create_member_v1", {
        in_applicationuserid: userId,
        in_first_name: name,
        in_last_name: lastName || "",
        in_gender: gender,
        in_dob: dob || null,
        in_phone: phone,
        in_email: email,
        in_address: address,
        in_city: city,
        in_state: stateName,
        in_pincode: pincode,
        in_membership_type: membershipType,
        in_membership_type:
          selectedPlan?.duration_days === 1
            ? Number(customDays)
            : selectedPlan?.duration_days,
        in_height: height ? Number(height) : null,
        in_weight: weight ? Number(weight) : null,
        in_emg_name: emgName || "",
        in_emg_phone: emgPhone || ""
      });

      if (error) throw error;

      alert("Member Added Successfully");
      router.back();

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.close}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Member</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* INPUTS */}
        <TextInput placeholder="First Name" style={styles.input} value={name} onChangeText={setName} maxLength={50}/>
        <TextInput placeholder="Last Name" style={styles.input} value={lastName} onChangeText={setLastName} maxLength={50}/>

        <View style={styles.row}>
          <View style={styles.codeBox}><Text>+91</Text></View>
          <TextInput
            placeholder="Phone"
            style={[styles.input, { flex: 1 }]}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />
        </View>

        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} maxLength={50} />

        {/* DOB */}
        {Platform.OS === "web" ? (
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={styles.webDate}
          />
        ) : (
          <>
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
              <Text>{dob || "Select Date of Birth"}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dob ? new Date(dob) : new Date()}
                mode="date"
                maximumDate={new Date()}
                onChange={(e, d) => {
                  setShowDatePicker(false);
                  if (d) setDob(d.toISOString().split("T")[0]);
                }}
              />
            )}
          </>
        )}

        {/* ADDRESS */}
        <TextInput placeholder="Address" style={[styles.input, { height: 80 }]} value={address} onChangeText={setAddress} multiline />
        <TextInput placeholder="City" style={styles.input} value={city} onChangeText={setCity} maxLength={30}/>
        <TextInput placeholder="State" style={styles.input} value={stateName} onChangeText={setStateName} maxLength={50}/>
        <TextInput placeholder="Pincode" style={styles.input} value={pincode} onChangeText={setPincode} maxLength={6}/>

        {/* DROPDOWN */}
        <View style={styles.dropdownWrapper}>
          <RNPickerSelect
            onValueChange={setMembershipType}
            items={options}
            value={membershipType}
            placeholder={{ label: "Select Membership Type", value: null }}
            style={pickerStyles}
        
          />
        </View>

        {/* DAY INPUT */}
        {selectedPlan?.duration_days === 1 && (
          <TextInput
            placeholder="Enter number of days"
            style={styles.input}
            keyboardType="numeric"
            value={customDays}
            onChangeText={setCustomDays}
            maxLength={50}
          />
        )}

        {/* HEALTH */}
        <TextInput placeholder="Height (cm)" style={styles.input} value={height} onChangeText={setHeight} maxLength={5}/>
        <TextInput placeholder="Weight (kg)" style={styles.input} value={weight} onChangeText={setWeight} maxLength={5} />

        {/* EMERGENCY */}
        <TextInput placeholder="Emergency Name" style={styles.input} value={emgName} onChangeText={setEmgName}  maxLength={50}/>
        <TextInput placeholder="Emergency Phone" style={styles.input} value={emgPhone} onChangeText={setEmgPhone} maxLength={10}/>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Saving..." : "Add Member"}</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const pickerStyles = {
  inputIOS: { padding: 14 },
  inputAndroid: { padding: 12 },
  inputWeb: { padding: 12, borderWidth: 0, outlineWidth: 0 }
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6F8" },
  container: { padding: 20 },

  input: {
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
    padding: 12,
    marginTop: 12
  },

  webDate: {
    height: 50,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
    border: "none",
    backgroundColor: "#E6EAF0"
  },

  row: { flexDirection: "row", gap: 10 },

  codeBox: {
    width: 70,
    height: 50,
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12
  },

  dropdownWrapper: {
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
    marginTop: 12
  },

  button: {
    backgroundColor: "#0A1E5E",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center"
  },

  buttonText: { color: "#fff", fontWeight: "600" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  close: { fontSize: 20 },
  headerTitle: { fontSize: 18, fontWeight: "600" }
});