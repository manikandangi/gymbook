import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Member = {
  id: string;
  name: string;
  code: string;
  phone: string;
  plan: string;
  expired: boolean;
  avatar: string;
  expiryDate: string;
};

export default function MemberDetailsScreen() {
  const { member } = useLocalSearchParams();
  const router = useRouter();

  const memberData: Member = member ? JSON.parse(member as string) : null;

  if (!memberData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Member not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Member Details</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.name}>{memberData.name}</Text>
        <Text style={styles.code}>{memberData.code}</Text>
        <Text style={styles.phone}>{memberData.phone}</Text>
        <Text style={styles.plan}>{memberData.plan}</Text>
        <Text style={styles.expiry}>Expiry: {new Date(memberData.expiryDate).toLocaleDateString()}</Text>
        {memberData.expired && <Text style={styles.expired}>Expired</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F8FB" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  back: { fontSize: 16, color: "#0B1B3A" },
  title: { fontSize: 18, fontWeight: "600" },
  content: { padding: 16 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  code: { fontSize: 16, color: "#64748B", marginBottom: 8 },
  phone: { fontSize: 16, marginBottom: 8 },
  plan: { fontSize: 16, marginBottom: 8 },
  expiry: { fontSize: 16, marginBottom: 8 },
  expired: { fontSize: 16, color: "red" },
});