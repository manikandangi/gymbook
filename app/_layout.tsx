  // app/_layout.tsx
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

  import { AuthContext, useAuth } from "@/contexts/auth";

  SplashScreen.preventAutoHideAsync();
  const queryClient = new QueryClient();
  function RootLayoutNav() {
    const { user, isLoading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
      if (isLoading) return;

      const inTabs = segments[0] === "(tabs)";

      if (!user && inTabs) {
        router.replace("/login");
      } else if (user && !inTabs) {
         router.replace("/(tabs)");
       
      }
    }, [user, segments, isLoading]);

    return (
      <Stack screenOptions={{ headerBackTitle: "Back" }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack>
    );
  }

  export default function RootLayout() {
    // const [fontsLoaded] = useFonts({
    //   Inter_400Regular,
    //   Inter_500Medium,
    //   Inter_600SemiBold,
    //   Inter_700Bold,
    // });

    // useEffect(() => {
    //   if (fontsLoaded) {
    //     SplashScreen.hideAsync();
    //   }
    // }, [fontsLoaded]);

    // if (!fontsLoaded) return null;

    return (
      <QueryClientProvider client={queryClient}>
        <AuthContext>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </AuthContext>
      </QueryClientProvider>
    );
  }
