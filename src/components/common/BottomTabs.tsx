import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "lucide-react-native";
import APITester from "../../screens/Index";
import Settings from "../../screens/Settings";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator<NavigationStackParamList>();

const BottomTabs: React.FC = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: theme.colors.tabBar }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.tabBarInactive,
          tabBarStyle: {
            backgroundColor: theme.colors.tabBar,
            borderTopColor: theme.colors.border,
            elevation: 0,
            shadowOpacity: 0,
            height: 60,
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            fontFamily: theme.typography.fontFamily.medium,
            fontSize: 12,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Index"
          component={APITester}
          options={{
            title: "Tester",
            tabBarIcon: ({ color, size }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <SettingsIcon size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomTabs;
