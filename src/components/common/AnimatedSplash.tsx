import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

export default function AnimatedSplash({
  onFirstFrame,
  onFinish,
}: {
  onFirstFrame: () => void;
  onFinish: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.25,
        duration: 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, [onFinish, scale]);

  return (
    <View style={styles.splashContainer} onLayout={onFirstFrame}>
      <Animated.Image
        source={require("../../../assets/logo.png")}
        resizeMode="contain"
        style={[styles.logo, { transform: [{ scale }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 160,
    height: 160,
  },
});
