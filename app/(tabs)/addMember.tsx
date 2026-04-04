import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView,
  StyleSheet, Text, TextInput, TouchableOpacity, View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { supabase } from "../supabaseClient";

const DEFAULT_FONT_FAMILY = Platform.select({ ios: 'System', android: 'sans-serif', web: 'system-ui' });

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
  city:      "",
  stateName: "",
  pincode:   "",
  height:    "",
  weight:    "",
  emgName:   "",
  emgPhone:  "",
};

/* ── Reusable field component ── */
const Field = ({ style, ...props }: React.ComponentProps<typeof TextInput>) => (
  <TextInput
    style={[styles.input, style]}
    placeholderTextColor="#6c7587"
    {...props}
  />
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

  const [appUserId, setAppUserId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      setForm({ ...INITIAL_FORM });
      setMembershipType(null);
      setCustomDays("");
    }, [])
  );

  useEffect(() => {
    (async () => {
      try {
        const storedId = Platform.OS === "web"
          ? localStorage.getItem("userid")
          : await AsyncStorage.getItem("userid");

        if (!storedId) {
          alert("User is not logged in. Please sign in again.");
          router.replace("/login");
          return;
        }

        setAppUserId(storedId);
      } catch (error) {
        console.warn("Failed to read user id from storage", error);
        alert("Unable to read user credentials. Please re-login.");
        router.replace("/login");
      }
    })();
  }, [router]);

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
      if (!appUserId) {
        alert("Unable to save member: no user session found. Please login again.");
        router.replace("/login");
        return;
      }

      const userIdNumber = Number(appUserId);
      if (Number.isNaN(userIdNumber)) {
        throw new Error("Invalid user id in storage");
      }

      let durationDays = isCustomDuration
        ? Number(customDays)
        : selectedPlan?.duration_days;
      const { error } = await supabase.rpc("ufn_create_member_v1", {
        in_applicationuserid: userIdNumber,
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
  }, [appUserId, form, isCustomDuration, customDays, selectedPlan, validate, router]);

  /* ── Render ── */
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentInset={{ bottom: 120 }}
          contentContainerStyle={[styles.outerContent, styles.scrollContent]}
        >
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => {
                setForm({ ...INITIAL_FORM });
                setMembershipType(null);
                setCustomDays("");
                router.back();
              }}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Add New Member</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Section: Personal */}
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <Field placeholder="First Name" value={form.name}     onChangeText={set("name")}     maxLength={50} />
            <Field placeholder="Last Name"  value={form.lastName} onChangeText={set("lastName")} maxLength={50} />
            <View style={styles.row}>
              <View style={styles.codeBox}><Text>+91</Text></View>
              <Field
                placeholder="Phone"
                style={{ flex: 1 }}
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9]/g, "");
                  set("phone")(numeric);
                }}
                maxLength={10}
              />
            </View>
            <Field placeholder="Email" value={form.email} onChangeText={set("email")} maxLength={50} />
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
            <Field
              placeholder="Address"
              value={form.address}
              onChangeText={set("address")}
              style={{ height: 80 }}
              multiline
            />
            <Field placeholder="Pincode" value={form.pincode} onChangeText={set("pincode")} maxLength={6} />
            <View style={styles.divider} />

            {/* Section: Location & Membership */}
            <Text style={styles.sectionTitle}>Location & Membership</Text>
            <View style={styles.dropdownWrapper}>
              <RNPickerSelect
                onValueChange={val => set("stateName")(val ?? "")}
                items={stateOptions}
                value={form.stateName}
                style={pickerStyles}
                placeholder={{ label: "Select State", value: null, color: "#0A1E5E" }}
              />
            </View>
            <View style={styles.dropdownWrapper}>
              <RNPickerSelect
                onValueChange={val => set("city")(val ?? "")}
                items={cityOptions}
                value={form.city}
                style={pickerStyles}
                placeholder={{ label: "Select City", value: null, color: "#0A1E5E" }}
              />
            </View>
            <View style={styles.dropdownWrapper}>
              <RNPickerSelect
                onValueChange={setMembershipType}
                items={membershipOptions}
                value={membershipType}
                style={pickerStyles}
                placeholder={{ label: "Select Membership Type", value: null, color: "#0A1E5E" }}
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
            <View style={styles.divider} />

            {/* Section: Health */}
            <Text style={styles.sectionTitle}>Health</Text>
            <Field placeholder="Height (cm)" value={form.height} onChangeText={set("height")} maxLength={5} />
            <Field placeholder="Weight (kg)" value={form.weight} onChangeText={set("weight")} maxLength={5} />
            <View style={styles.divider} />

            {/* Section: Emergency */}
            <Text style={styles.sectionTitle}>Emergency Contact</Text>
            <Field placeholder="Emergency Name"  value={form.emgName}  onChangeText={set("emgName")}  maxLength={50} />
            <View style={styles.row}>
              <View style={styles.codeBox}><Text>+91</Text></View>
              <Field
                placeholder="Emergency Phone"
                style={{ flex: 1 }}
                keyboardType="phone-pad"
                value={form.emgPhone}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9]/g, "");
                  set("emgPhone")(numeric);
                }}
                maxLength={10}
              />
            </View>

            {/* Submit */}
            <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? "Saving…" : "Add Member"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ── Styles ── */
const pickerStyles = {
  inputIOS: {
    padding: 14,
    color: "#0A1E5E",
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
  },
  inputAndroid: {
    padding: 12,
    color: "#0A1E5E",
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
  },
  inputWeb: {
    padding: 12,
    borderWidth: 0,
    outlineWidth: 0,
    color: "#0A1E5E",
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
  },
};

const styles = StyleSheet.create({
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#0A1E5E',
      marginTop: 18,
      marginBottom: 2,
      letterSpacing: 0.1,
    },
    divider: {
      height: 1,
      backgroundColor: '#E6EAF0',
      marginVertical: 18,
      borderRadius: 2,
    },
  safe:            { flex: 1, backgroundColor: "#F5F6F8" },
  flex:            { flex: 1 },
  outerContent:    { padding: 18, paddingTop: 32, paddingBottom: 32 },
  scrollContent:   { paddingBottom: 160 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
    padding: 14,
    marginTop: 14,
    color: "#0A1E5E",
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: 16,
  },
  webDate: {
    height: 50, borderRadius: 10, padding: 10,
    marginTop: 14, border: "none", backgroundColor: "#E6EAF0",
  },
  row:             { flexDirection: "row", gap: 10, marginTop: 14 },
  codeBox: {
    width: 70, height: 50, backgroundColor: "#E6EAF0",
    borderRadius: 10, justifyContent: "center",
    alignItems: "center",
  },
  dropdownWrapper: {
    backgroundColor: "#E6EAF0",
    borderRadius: 10,
    marginTop: 14,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#0A1E5E",
    padding: 18,
    borderRadius: 12,
    marginTop: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText:      { color: "#fff", fontWeight: "700", fontSize: 17, letterSpacing: 0.5 },
  headerRow:       { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  close:           { fontSize: 22, color: "#0A1E5E" },
  headerTitle:     { fontSize: 22, fontWeight: "700", color: "#0A1E5E" },
});