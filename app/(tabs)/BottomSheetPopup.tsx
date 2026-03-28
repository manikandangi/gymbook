import {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Plus } from "lucide-react-native";
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
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["65%"], []);
  const [webVisible, setWebVisible] = useState(false);

  const openSheet = useCallback(() => {
    if (Platform.OS === "web") {
      setWebVisible(true);
    } else {
      sheetRef.current?.present();
    }
  }, []);

  const closeSheet = () => {
    if (Platform.OS === "web") {
      setWebVisible(false);
    } else {
      sheetRef.current?.dismiss();
    }
  };

  return (
    <>
      {/* FAB */}
      <View style={styles.fabWrapper}>
        <TouchableOpacity style={styles.fab} onPress={openSheet}>
          <Plus size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* MOBILE */}
      {Platform.OS !== "web" && (
        <BottomSheetModal
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 18 }}>Bottom Sheet Working ✅</Text>

            <TouchableOpacity onPress={closeSheet}>
              <Text style={{ color: "blue", marginTop: 20 }}>Close</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
      )}

      {/* WEB */}
      {Platform.OS === "web" && (
        <Modal visible={webVisible} transparent animationType="slide">
          <View style={styles.overlay} />
          <View style={styles.webSheet}>
            <Text style={{ padding: 20 }}>Web Sheet</Text>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fabWrapper: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    zIndex: 9999,
    elevation: 30,
  },

  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0A1E5C",
    justifyContent: "center",
    alignItems: "center",
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
  },
});