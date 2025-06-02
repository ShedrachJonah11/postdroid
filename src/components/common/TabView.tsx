import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

type Tab = {
  key: string;
  title: string;
  content: React.ReactNode;
};

type TabViewProps = {
  tabs: Tab[];
};

export const TabView: React.FC<TabViewProps> = ({ tabs }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || "");

  const handleTabPress = (key: string) => {
    setActiveTab(key);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.tabsContainer,
          { borderBottomColor: theme.colors.border },
        ]}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => handleTabPress(tab.key)}
              style={styles.tab}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: isActive
                      ? theme.colors.primary
                      : theme.colors.subtext,
                    fontFamily: isActive
                      ? theme.typography.fontFamily.semibold
                      : theme.typography.fontFamily.regular,
                  },
                ]}
              >
                {tab.title}
              </Text>
              {isActive && (
                <View
                  style={[
                    styles.indicator,
                    { backgroundColor: theme.colors.primary },
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.contentContainer}>
        {tabs.find((tab) => tab.key === activeTab)?.content}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    width: "100%",
    justifyContent: "space-around",
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: "relative",
  },
  tabText: {
    fontSize: 14,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  contentContainer: {
    flex: 1,
  },
});
