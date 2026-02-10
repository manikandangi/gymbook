import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
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
};

const MEMBERS: Member[] = [
  {
    id: "1",
    name: "Vasu.468",
    code: "#SNEU0459",
    phone: "+918525863296",
    plan: "One month plan",
    expired: true,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "2",
    name: "Vignesh .511",
    code: "#SNEU0496",
    phone: "+916380351359",
    plan: "One month plan",
    expired: true,
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: "3",
    name: "Prasanna .486",
    code: "#SNEU0483",
    phone: "+919894480342",
    plan: "One month plan",
    expired: true,
    avatar: "https://i.pravatar.cc/150?img=18",
  },
];

export default function memberScreen() {
  const renderItem = ({ item }: { item: Member }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>
          {item.name} <Text style={styles.code}>{item.code}</Text>
        </Text>
        <Text style={styles.phone}>{item.phone}</Text>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.plan}>{item.plan}</Text>
          {item.expired && (
            <View style={styles.expiredBadge}>
              <View style={styles.dot} />
              <Text style={styles.expiredText}>Expired</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Members</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconCircle} />
          <TouchableOpacity style={styles.iconCircle} />
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search for name or phone"
          placeholderTextColor="#9AA4B2"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.squareBtn}>
          <Text style={styles.squareBtnText}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.squareBtnOutline} />
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <View style={styles.filterChip}>
          <Text style={styles.filterText}>Expired in last 30 days</Text>
        </View>
        <View style={styles.filterChip}>
          <Text style={styles.filterText}>Sorted By Expiry - Desc</Text>
        </View>
      </View>

      <Text style={styles.showing}>Showing 28 Members</Text>

      {/* List */}
      <FlatList
        data={MEMBERS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FB",
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0B1B3A",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EEF2F7",
  },

  searchRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    fontSize: 14,
  },
  squareBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#0B1B3A",
    alignItems: "center",
    justifyContent: "center",
  },
  squareBtnText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  squareBtnOutline: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
  },

  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 12,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },
  filterText: {
    fontSize: 12,
    color: "#0B1B3A",
    fontWeight: "500",
  },

  showing: {
    paddingHorizontal: 16,
    marginVertical: 10,
    color: "#64748B",
    fontSize: 13,
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 14,
    alignItems: "flex-start",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0B1B3A",
  },
  code: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  phone: {
    marginTop: 2,
    fontSize: 13,
    color: "#0B1B3A",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plan: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0B1B3A",
  },
  expiredBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EF4444",
    marginRight: 6,
  },
  expiredText: {
    fontSize: 12,
    color: "#B91C1C",
    fontWeight: "600",
  },

  fab: {
    position: "absolute",
    bottom: 72,
    alignSelf: "center",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0B1B3A",
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: {
    color: "#FFFFFF",
    fontSize: 30,
    marginBottom: 2,
  },

  bottomTab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  tabText: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
  },
  tabActive: {
    color: "#0B1B3A",
  },
});
