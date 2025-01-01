import { StyleSheet, View } from "react-native";
import APITester from "./src/screens/Tester";

export default function App() {
  return (
    <View style={styles.container}>
      <APITester />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
