import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { TabView } from "../common/TabView";
import { ChevronDown } from "lucide-react-native";

type ResponseSectionProps = {
  statusCode?: string;
  responseTime?: string;
  responseContent?: string;
};

export const ResponseSection: React.FC<ResponseSectionProps> = ({
  statusCode = "200",
  responseTime = "3357ms",
  responseContent = "accept-ch: Sec-CH-Prefers-Color-Sche me\nalt-svc: h3=\":443\"; ma=2592000,h3-29=\":443\" ma=2592000\ncache-control: private, max-age=0\ncontent-security-policy-report-only: ob\njec\nt-s",
}) => {
  const { theme } = useTheme();

  const responseTabs = [
    { key: "responseBody", title: "Body" },
    { key: "responseHeader", title: "Header" },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          marginHorizontal: theme.spacing.m,
          borderRadius: theme.borderRadius.medium,
          marginTop: 24,
        },
      ]}
    >
      <View style={styles.statusRow}>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: theme.colors.response.statusBadgeBackground,
              borderBottomColor: theme.colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily.semibold,
              },
            ]}
          >
            {statusCode}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.timeBadge,
            {
              backgroundColor: theme.colors.methodSelector.background,
              borderColor: theme.colors.methodSelector.border,
            },
          ]}
        >
          <Text
            style={[
              styles.timeText,
              {
                color: theme.colors.methodSelector.text,
                fontFamily: theme.typography.fontFamily.medium,
              },
            ]}
          >
            {responseTime}
          </Text>
          <ChevronDown size={16} color={theme.colors.methodSelector.text} />
        </TouchableOpacity>
      </View>
      
      <TabView 
        tabs={responseTabs}
        showContent={false}
        style={{ marginTop: 8 }}
      />
      
      <View
        style={[
          styles.responseContent,
          {
            backgroundColor: theme.colors.response.contentBackground,
            borderColor: theme.colors.response.contentBorder,
          },
        ]}
      >
        <Text
          style={[
            styles.responseContentText,
            {
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.regular,
            },
          ]}
        >
          {responseContent}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    overflow: "hidden",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
    minWidth: 70,
    height: 40,
  },
  timeText: {
    fontSize: 14,
    marginRight: 4,
  },
  responseContent: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  responseContentText: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 