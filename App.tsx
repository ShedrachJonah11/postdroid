import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Router from "./src/router/Router";
import { ThemeProvider } from "./src/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import AnimatedSplash from "./src/components/common/AnimatedSplash";

SplashScreen.preventAutoHideAsync().catch(() => {});
export default function App() {
  const [assetsReady, setAssetsReady] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    (async () => {
      await Asset.loadAsync([require("./assets/logo.png")]);
      setAssetsReady(true);
    })();
  }, []);

  const onFirstFrame = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  if (assetsReady && !animationDone) {
    return (
      <AnimatedSplash
        onFirstFrame={onFirstFrame}
        onFinish={() => setAnimationDone(true)}
      />
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <Router />
        </View>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
