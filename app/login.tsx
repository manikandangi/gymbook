import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // ✅ navigate to tabs index
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>DGYMBOOK</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A1F44" },
  header: { height: 160, justifyContent: "center", alignItems: "center" },
  logo: { color: "#fff", fontSize: 28, fontWeight: "700" },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  input: {
    height: 50,
    backgroundColor: "#E9EEF4",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9EEF4",
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
  },
  passwordInput: { flex: 1 },
  loginBtn: {
    backgroundColor: "#0A1F44",
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
