import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import {
  FileText,
  Plus,
  Receipt,
  UserPlus,
  Users,
} from "lucide-react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function BottomSheetWithFAB() {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["65%"], []);
  const [webVisible, setWebVisible] = useState(false);

  const openSheet = useCallback(() => {
    if (Platform.OS === "web") {
      setWebVisible(true);
    } else {
      sheetRef.current?.snapToIndex(0);
    }
  }, []);

  const closeSheet = () => {
    if (Platform.OS === "web") {
      setWebVisible(false);
    } else {
      sheetRef.current?.close();
    }
  };

  return (
    <>
      {/* ================= FAB ================= */}
      <View style={styles.fabWrapper}>
        <View style={styles.greyLine} />

        <TouchableOpacity style={styles.fab} onPress={openSheet}>
          <Plus size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ================= MOBILE SHEET ================= */}
      {Platform.OS !== "web" && (
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backgroundStyle={styles.sheetBg}
          handleIndicatorStyle={styles.handle}
        >
          <SheetContent closeSheet={closeSheet} />
        </BottomSheet>
      )}

      {/* ================= WEB FALLBACK ================= */}
      {Platform.OS === "web" && (
        <Modal visible={webVisible} transparent animationType="slide">
          <View style={styles.overlay} />
          <View style={styles.webSheet}>
            <SheetContent closeSheet={closeSheet} />
          </View>
        </Modal>
      )}
    </>
  );
}

/* ===================================================== */
/* SHEET CONTENT */
/* ===================================================== */

const SheetContent = ({ closeSheet }: { closeSheet: () => void }) => {
  const router = useRouter();

  const navigate = (path: string) => {
    closeSheet();
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>+ Add New</Text>

      {/* Grid */}
      <View style={styles.gridCard}>
        <View style={styles.grid}>
          <MenuItem icon={<Users size={22} />} label="Member" onPress={() => navigate("/(tabs)/addMember")}/>

          <MenuItem
            icon={<UserPlus size={22} />}
            label="Staff"
            onPress={() => navigate("/(tabs)/AddStaffScreen")}
          />

          <MenuItem icon={<FileText size={22} />} label="Plan" 
          onPress={() => navigate("/(tabs)/NewPlan")}
          />
          <MenuItem icon={<Receipt size={22} />} label="Leads" onPress={() => navigate("/(tabs)/Leeds")}/>
          <MenuItem icon={<Receipt size={22} />} label="Expense"  onPress={() => navigate("/(tabs)/CreateExpenseScreen")}/>
        </View>
      </View>

      <Text style={styles.section}>Other Actions</Text>

      <View style={styles.actionCard}>
        <ActionItem label="Manage Staff" onPress={() => navigate("/(tabs)/ManageStaff")}/>
        <ActionItem label="Manage Plans" onPress={() => navigate("/(tabs)/ManagePlans")}/>
        <ActionItem label="View All Leads" onPress={() => navigate("/(tabs)/PotentialLeads")}/>
        <ActionItem label="Manage Expenses" onPress={() => navigate("/(tabs)/ExpensesScreen")}/>
      </View>
    </View>
  );
};

/* ===================================================== */
/* ITEMS */
/* ===================================================== */

const MenuItem = ({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    {icon}
    <Text style={styles.menuText}>{label}</Text>
  </TouchableOpacity>
);
interface ActionItemProps {
  label: string;
  onPress?: () => void;
}

const ActionItem: React.FC<ActionItemProps> = ({
  label,
  onPress,
}) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <Text style={styles.actionText}>{label}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

/* ===================================================== */
/* STYLES */
/* ===================================================== */

const styles = StyleSheet.create({
  fabWrapper: {
    position: "absolute",
    bottom: 18,
    alignSelf: "center",
    alignItems: "center",
    zIndex: 999,
  },

  fab: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0A1E5C',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabPlus: { color: '#FFF', fontSize: 34 },

  sheetBg: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },

  handle: {
    width: 60,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 16,
    color: "#111827",
  },

  gridCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingVertical: 18,
    backgroundColor: "#FFFFFF",
    marginBottom: 24,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 26,
  },

  menuItem: {
    width: 90,
    alignItems: "center",
    marginBottom: 22,
  },

  menuText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "500",
    color: "#111827",
  },

  section: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    color: "#111827",
  },

  actionCard: {
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    paddingHorizontal: 16,
  },

  actionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  actionText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },

  arrow: {
    fontSize: 20,
    color: "#9CA3AF",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  webSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingBottom: 40,
  },
});
