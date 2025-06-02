import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import Router from "./src/router/Router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();
    })();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Router />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
