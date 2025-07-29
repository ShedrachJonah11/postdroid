import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationStackParamList } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "lucide-react-native";
import APITester from "../../screens/Index";
import Settings from "../../screens/Settings";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator<NavigationStackParamList>();

const BottomTabs: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'Index' | 'Settings'>('Index');

  const CustomTabBar = ({ state, navigation }: any) => {
    return (
      <View style={styles.tabBarContainer}>
        <View style={[styles.toggleContainer, { backgroundColor: '#14344766' }]}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeTab === 'Index' && styles.activeToggleButton,
              { backgroundColor: activeTab === 'Index' ? '#F5F5F5' : 'transparent' }
            ]}
            onPress={() => {
              setActiveTab('Index');
              navigation.navigate('Index');
            }}
            activeOpacity={0.7}
          >
            <HomeIcon 
              size={24} 
              color={activeTab === 'Index' ? '#143447' : '#fff'} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeTab === 'Settings' && styles.activeToggleButton,
              { backgroundColor: activeTab === 'Settings' ? '#F5F5F5' : 'transparent' }
            ]}
            onPress={() => {
              setActiveTab('Settings');
              navigation.navigate('Settings');
            }}
            activeOpacity={0.7}
          >
            <SettingsIcon 
              size={24} 
              color={activeTab === 'Settings' ? '#143447' : '#fff'} 
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={CustomTabBar}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Index"
          component={APITester}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 30,
    padding: 4,
    height: 56,
    width: 130,
    alignItems: 'center',
  },
  toggleButton: {
    flex: 1,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    height: 48,
  },
  activeToggleButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default BottomTabs;
