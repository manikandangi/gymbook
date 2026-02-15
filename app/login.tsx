import { Ionicons } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen: FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = (): void => {
    console.log("Login:", emailOrPhone, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>DGYMBO—OK</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Login with email or phone</Text>

        {/* Email / Phone */}
        <Text style={styles.label}>Email/Phone</Text>
        <TextInput
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          style={styles.input}
          placeholder="Enter your email or phone number"
          placeholderTextColor="#8A96A3"
          keyboardType="email-address"
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordBox}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor="#8A96A3"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#0A1F44"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot */}
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* OTP */}
        <TouchableOpacity style={styles.otpBtn}>
          <Text style={styles.otpText}>Login with OTP</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          Don't have an account?
          <Text style={styles.contact}> Contact us.</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1F44",
  },
  header: {
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 1,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
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
  },
  passwordInput: {
    flex: 1,
  },
  forgot: {
    color: "#0A1F44",
    fontSize: 13,
    marginTop: 10,
    marginBottom: 30,
  },
  loginBtn: {
    backgroundColor: "#0A1F44",
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  otpBtn: {
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  otpText: {
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
    color: "#6B7280",
  },
  contact: {
    color: "#000",
    fontWeight: "600",
  },
});
