import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";

type Tab = {
  key: string;
  title: string;
  content?: React.ReactNode;
};

type TabViewProps = {
  tabs: Tab[];
  showContent?: boolean;
  style?: any;
};

export const TabView: React.FC<TabViewProps> = ({
  tabs,
  showContent = true,
  style,
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || "");

  const handleTabPress = (key: string) => {
    setActiveTab(key);
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.tabsContainer,
          {
            backgroundColor: theme.colors.tabView.background,
          },
        ]}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.key;
          const isFirst = index === 0;
          const isLast = index === tabs.length - 1;

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => handleTabPress(tab.key)}
              style={[
                styles.tab,
                isActive && {
                  ...styles.activeTab,
                  backgroundColor: theme.colors.primary,
                },
                isFirst && styles.firstTab,
                isLast && styles.lastTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: isActive
                      ? theme.colors.tabView.activeText
                      : theme.colors.tabView.inactiveText,
                    fontFamily: isActive
                      ? theme.typography.fontFamily.semibold
                      : theme.typography.fontFamily.regular,
                  },
                ]}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {showContent && (
        <View style={styles.contentContainer}>
          {tabs.find((tab) => tab.key === activeTab)?.content}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: "row",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: "hidden",
    padding: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    borderRadius: 8,
    margin: 2,
  },
  firstTab: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  lastTab: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  tabText: {
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
  },
});
