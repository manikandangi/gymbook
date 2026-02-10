import BottomNav from "@/components/BottomNav";
import { Tabs, usePathname } from "expo-router";
import React from "react";

export default function TabLayout() {
  const pathname = usePathname();

  // routes where footer should be hidden
  const hideFooterRoutes = ["/AddStaffScreen",'/NewPlan','/CreateExpenseScreen'];

  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ff3b30",
          tabBarInactiveTintColor: "#666",
          tabBarStyle: { display: "none" },
          headerShown: false,
          headerStyle: {
            backgroundColor: "#1a1a1a",
          },
          headerTintColor: "#fff",
          headerShadowVisible: false,
        }}
      />

      {/* Footer */}
      {!shouldHideFooter && <BottomNav />}
    </>
  );
}
