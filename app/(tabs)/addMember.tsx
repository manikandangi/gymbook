import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from "@react-native-community/datetimepicker";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Keyboard, Platform, SafeAreaView, ScrollView,
  StyleSheet, Text, TextInput, TouchableOpacity, View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

/* ── Supabase ── */
const supabase = createClient(
  "https://vihsrmhbzlejvueultdq.supabase.co",
  "sb_publishable_HMy-TLDNjSGsWNrgFIRhHw_O_0wJjYb"
);

/* ── Defaults ── */
const DEFAULT_STATE = { label: "Tamil Nadu", value: "Tamil Nadu" };
const DEFAULT_CITY  = { label: "Chennai",    value: "Chennai"    };

/* ── Initial form state ── */
const INITIAL_FORM = {
  name:      "",
  lastName:  "",
  phone:     "",
  email:     "",
  dob:       "",
  gender:    "Male",
  address:   "",
  city:      DEFAULT_CITY.value,
  stateName: DEFAULT_STATE.value,
  pincode:   "",
  height:    "",
  weight:    "",
  emgName:   "",
  emgPhone:  "",
};

/* ── Reusable field component ── */
const Field = ({ style, ...props }: React.ComponentProps<typeof TextInput>) => (
  <TextInput style={[styles.input, style]} {...props} />
);

/* ══════════════════════════════════════════ */
export default function AddMemberScreen() {
  const router = useRouter();

  const [form, setForm] = useState({ ...INITIAL_FORM });
  const set = useCallback(
    (key: keyof typeof INITIAL_FORM) => (val: string) =>
      setForm(prev => ({ ...prev, [key]: val })),
    []
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [membershipType, setMembershipType] = useState<number | null>(null);
  const [membershipData, setMembershipData] = useState<any[]>([]);
  const [customDays, setCustomDays]         = useState("");
  const [loading, setLoading]               = useState(false);

  /* ── State / City dropdown data ── */
  const [stateOptions, setStateOptions] = useState<{ label: string; value: string }[]>([]);
  const [cityOptions, setCityOptions]   = useState<{ label: string; value: string }[]>([]);

  /* ── Fetch all data on mount ── */
  useEffect(() => {
    (async () => {
      const [statesRes, citiesRes, membershipRes] = await Promise.all([
        supabase.rpc("ufn_get_states"),
        supabase.rpc("ufn_get_cities"),
        supabase.rpc("ufn_get_membership_types"),
      ]);

      /* States — fallback to Tamil Nadu on error */
      if (!statesRes.error && statesRes.data?.length) {
        setStateOptions(
          statesRes.data.map((s: any) => ({
            label: s.state_name,
            value: s.state_id,
          }))
        );
      } else {
        setStateOptions([DEFAULT_STATE]);
      }

      /* Cities — fallback to Chennai on error */
      if (!citiesRes.error && citiesRes.data?.length) {
        setCityOptions(
          citiesRes.data.map((c: any) => ({
            label: c.city_name,
            value: c.city_id,
          }))
        );
      } else {
        setCityOptions([DEFAULT_CITY]);
      }

      /* Membership types */
      if (!membershipRes.error && membershipRes.data) {
        setMembershipData(membershipRes.data);
      }
    })();
  }, []);

  /* ── Derived values ── */
  const membershipOptions = useMemo(() =>
    membershipData.map(item => ({
      label: `${item.membership_name} (${item.duration_days} days)`,
      value: item.duration_days,
    })), [membershipData]);

  const selectedPlan = useMemo(() =>
    membershipData.find(item => item.duration_days === membershipType),
    [membershipData, membershipType]);

  const isCustomDuration = selectedPlan?.duration_days === 1;

  /* ── Reset custom days when plan changes ── */
  useEffect(() => { setCustomDays(""); }, [membershipType]);

  /* ── Validation ── */
  const validate = useCallback(() => {
    const { name, lastName, phone, email, address, city,
            stateName, pincode, height, weight, emgName, emgPhone } = form;

    if (!name || !lastName || !phone || !email || !address || !city ||
        !stateName || !pincode || !membershipType || !height || !weight || !emgName) {
      alert("All fields are mandatory"); return false;
    }
    if (phone.length < 10 || emgPhone.length < 10) {
      alert("Enter valid phone number"); return false;
    }
    if (isCustomDuration && !customDays) {
      alert("Enter number of days"); return false;
    }
    return true;
  }, [form, membershipType, isCustomDuration, customDays]);

  /* ── Save ── */
  const handleSave = useCallback(async () => {
    if (!validate()) return;
    Keyboard.dismiss();
    setLoading(true);

    try {
      const userId = Platform.OS === "web"
        ? localStorage.getItem("userid")
        : await AsyncStorage.getItem("userid");

      let durationDays = isCustomDuration
        ? Number(customDays)
        : selectedPlan?.duration_days;
        debugger;
      const { error } = await supabase.rpc("ufn_create_member_v1", {
        in_applicationuserid: userId,
        in_first_name:        form.name,
        in_last_name:         form.lastName,
        in_gender:            form.gender,
        in_dob:               form.dob || null,
        in_phone:             form.phone,
        in_email:             form.email,
        in_address:           form.address,
        in_city:              form.city,
        in_state:             form.stateName,
        in_pincode:           form.pincode,
        in_membership_type:   durationDays,
        in_height:            form.height ? Number(form.height) : null,
        in_weight:            form.weight ? Number(form.weight) : null,
        in_emg_name:          form.emgName,
        in_emg_phone:         form.emgPhone,
      });

      if (error) throw error;

      alert("Member Added Successfully");
      setForm({ ...INITIAL_FORM });   // ← reset all text fields
      setMembershipType(null);        // ← reset membership dropdown
      setCustomDays("");              // ← reset custom days
      router.back();

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }, [form, membershipType, isCustomDuration, customDays, selectedPlan, validate, router]);

  /* ── Render ── */
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Header */}
         <View style={styles.header}>
          <TouchableOpacity onPress={() => {
            setForm({ ...INITIAL_FORM });
            setMembershipType(null);
            setCustomDays("");
            router.back();
          }}>
            <Text style={styles.close}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Member</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Personal */}
        <Field placeholder="First Name" value={form.name}     onChangeText={set("name")}     maxLength={50} />
        <Field placeholder="Last Name"  value={form.lastName} onChangeText={set("lastName")} maxLength={50} />

        <View style={styles.row}>
          <View style={styles.codeBox}><Text>+91</Text></View>
          <Field
            placeholder="Phone"
            style={{ flex: 1 }}
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={set("phone")}
            maxLength={10}
          />
        </View>

        <Field placeholder="Email" value={form.email} onChangeText={set("email")} maxLength={50} />

        {/* DOB */}
        {Platform.OS === "web" ? (
          <input
            type="date"
            value={form.dob}
            onChange={e => set("dob")(e.target.value)}
            style={styles.webDate as any}
          />
        ) : (
          <>
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
              <Text>{form.dob || "Select Date of Birth"}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={form.dob ? new Date(form.dob) : new Date()}
                mode="date"
                maximumDate={new Date()}
                onChange={(_, d) => {
                  setShowDatePicker(false);
                  if (d) set("dob")(d.toISOString().split("T")[0]);
                }}
              />
            )}
          </>
        )}

        {/* Address */}
        <Field
          placeholder="Address"
          value={form.address}
          onChangeText={set("address")}
          style={{ height: 80 }}
          multiline
        />
        <Field placeholder="Pincode" value={form.pincode} onChangeText={set("pincode")} maxLength={6} />

        {/* State Dropdown */}
        <View style={styles.dropdownWrapper}>
          <RNPickerSelect
            onValueChange={val => set("stateName")(val ?? "")}
            items={stateOptions}
            value={form.stateName}
            style={pickerStyles}
            placeholder={{ label: "Select State", value: null }}
          />
        </View>

        {/* City Dropdown */}
        <View style={styles.dropdownWrapper}>
          <RNPickerSelect
            onValueChange={val => set("city")(val ?? "")}
            items={cityOptions}
            value={form.city}
            style={pickerStyles}
            placeholder={{ label: "Select City", value: null }}
          />
        </View>

        {/* Membership */}
        <View style={styles.dropdownWrapper}>
          <RNPickerSelect
            onValueChange={setMembershipType}
            items={membershipOptions}
            value={membershipType}
            style={pickerStyles}
            placeholder={{ label: "Select Membership Type", value: null }}
          />
        </View>

        {isCustomDuration && (
          <Field
            placeholder="Enter number of days"
            keyboardType="numeric"
            value={customDays}
            onChangeText={setCustomDays}
            maxLength={4}
          />
        )}

        {/* Health */}
        <Field placeholder="Height (cm)" value={form.height} onChangeText={set("height")} maxLength={5} />
        <Field placeholder="Weight (kg)" value={form.weight} onChangeText={set("weight")} maxLength={5} />

        {/* Emergency */}
        <Field placeholder="Emergency Name"  value={form.emgName}  onChangeText={set("emgName")}  maxLength={50} />
        <Field placeholder="Emergency Phone" value={form.emgPhone} onChangeText={set("emgPhone")} maxLength={10} />

        {/* Submit */}
        <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Saving…" : "Add Member"}</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ── Styles ── */
const pickerStyles = {
  inputIOS:     { padding: 14 },
  inputAndroid: { padding: 12 },
  inputWeb:     { padding: 12, borderWidth: 0, outlineWidth: 0 },
};

const styles = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: "#F5F6F8" },
  container:       { padding: 20 },
  input: {
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  webDate: {
    height: 50, borderRadius: 10, padding: 10,
    marginTop: 12, border: "none", backgroundColor: "#E6EAF0",
  },
  row:             { flexDirection: "row", gap: 10 },
  codeBox: {
    width: 70, height: 50, backgroundColor: "#E6EAF0",
    borderRadius: 10, justifyContent: "center",
    alignItems: "center", marginTop: 12,
  },
  dropdownWrapper: { backgroundColor: "#E6EAF0", borderRadius: 10, marginTop: 12 },
  button: {
    backgroundColor: "#0A1E5E", padding: 15,
    borderRadius: 10, marginTop: 20, alignItems: "center",
  },
  buttonText:      { color: "#fff", fontWeight: "600" },
  header:          { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  close:           { fontSize: 20 },
  headerTitle:     { fontSize: 18, fontWeight: "600" },
});