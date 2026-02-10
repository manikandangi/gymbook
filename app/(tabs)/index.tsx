import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();  
    const navigate = (path: string) => {
      router.push(path);
    };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Unique Fitness</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="call-outline" size={22} style={styles.icon} />
          <Ionicons name="settings-outline" size={22} style={styles.icon} onPress={() => navigate("/(tabs)/profile")}/>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Cards */}
        <View style={styles.row}>
          <StatCard
            label="Active Members"
            value="59"
            colors={["#3B82F6", "#2563EB"]}
            href="/(tabs)/member"
          />
          <StatCard
            label="Expired in 30 days"
            value="5"
            colors={["#EF4444", "#DC2626"]}
            href="/(tabs)/member"
          />
        </View>

        <View style={styles.row}>
          <WhiteCard label="Expiring in 10 days" value="33" highlight />
          <WhiteCard label="Total Members" value="65" />
        </View>

        <View style={styles.singleRow}>
          <WhiteCard label="Today's Leads" value="0" />
        </View>

        {/* Quick Reports */}
        <Text style={styles.section}>Quick Reports</Text>

        <View style={styles.reportCard}>
          <View style={styles.reportHeader}>
            <Text style={styles.reportDate}>
              28 Jan 2026 - 28 Jan 2026
            </Text>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>Yesterday</Text>
              <Ionicons name="chevron-down" size={14} />
            </View>
          </View>

          <View style={styles.reportRow}>
            <ReportItem label="New Member" value="65" />
            <ReportItem label="All-time Balance" value="₹0" />
          </View>

          <View style={styles.reportRow}>
            <ReportItem label="Memberships" value="1" />
            <ReportItem label="Total Revenue" value="₹1,000" />
          </View>
        </View>

        {/* Members with balance */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.section}>Members with balance</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>0</Text>
            </View>
          </View>
          <Text style={styles.muted}>No member with balance</Text>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}
const StatCard = ({ label, value, colors }: any) => (
  <View style={[styles.statCard, { backgroundColor: colors[0] }]}>
    <View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>

    <View style={styles.statArrow}>
      <Ionicons name="chevron-forward" size={16} color="#fff" href="/(tabs)/member" />
    </View>
  </View>
);
const WhiteCard = ({ label, value, highlight }: any) => (
  <View style={styles.whiteCard} >
    <View>
      <Text style={styles.whiteLabel}>{label}</Text>
      <Text
        style={[
          styles.whiteValue,
          highlight && { color: "#F59E0B" },
        ]}
      >
        {value}
      </Text>
    </View>

    <View style={styles.arrowBox}>
      <Ionicons name="chevron-forward" size={16} color="#6B7280"/>
    </View>
  </View>
);

const ReportItem = ({ label, value }: any) => (
  <View style={{ flex: 1 }}>
    <Text style={styles.whiteLabel}>{label}</Text>
    <Text style={styles.whiteValue}>{value}</Text>
  </View>
);

// const NavItem = ({ icon, label, active }: any) => (
//   <View style={styles.navItem}>
//     <Ionicons
//       name={icon}
//       size={22}
//       color={active ? "#0B1F4B" : "#9CA3AF"}
//     />
//     <Text
//       style={[
//         styles.navLabel,
//         active && { color: "#0B1F4B" },
//       ]}
//     >
//       {label}
//     </Text>
//   </View>
// );

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  headerIcons: { flexDirection: "row" },
  icon: { marginLeft: 16 },

  row: { flexDirection: "row", paddingHorizontal: 16, marginBottom: 12 },
  singleRow: { paddingHorizontal: 16, marginBottom: 12 },

  statCard: {
    flex: 1,
    height: 90,
    borderRadius: 14,
    padding: 16,
    marginRight: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: { color: "#E5E7EB", fontSize: 13 },
  statValue: { fontSize: 28, fontWeight: "700", color: "#fff" },
  statArrow: {   
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  whiteCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginRight: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  whiteLabel: { color: "#6B7280", fontSize: 13 },
  whiteValue: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 6,
    color: "#111827",
  },
  arrowBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },

  section: {
    fontSize: 16,
    fontWeight: "600",
    margin: 16,
  },

  reportCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
  },
  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reportDate: { fontSize: 13, color: "#6B7280" },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  dropdownText: { fontSize: 13, marginRight: 4 },

  reportRow: { flexDirection: "row", marginTop: 16 },

  balanceCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badge: {
    backgroundColor: "#0B1F4B",
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  badgeText: { color: "#fff", fontSize: 12 },
  muted: { color: "#9CA3AF", marginTop: 8 },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    overflow: "visible",
  },
  navItem: { alignItems: "center" },
  navLabel: { fontSize: 11, color: "#9CA3AF" },
});
