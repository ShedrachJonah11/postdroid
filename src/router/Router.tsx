import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import APITesterScreen from "../screens/Index";
import SettingsScreen from "../screens/Settings";
import { NavigationStackParamList } from "../types/navigation";
import BottomTabs from "../components/common/BottomTabs";

const Stack = createNativeStackNavigator<NavigationStackParamList>();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Index"
          component={APITesterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
