import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { TabView } from "../../components/common/TabView";
import { Res } from "../../lib/response";

type ResponseViewerProps = {
  response: Res;
};

export const ResponseViewer: React.FC<ResponseViewerProps> = ({ response }) => {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(true);
  const [body, setBody] = useState<any>(null);

  const status = response._element.status;

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return theme.colors.success;
    if (status >= 300 && status < 400) return theme.colors.info;
    if (status >= 400 && status < 500) return theme.colors.warning;
    if (status >= 500) return theme.colors.error;
    return theme.colors.subtext;
  };

  const formatJson = (json: any) => {
    try {
      return JSON.stringify(json, null, 2);
    } catch (e) {
      return JSON.stringify(json);
    }
  };

  useEffect(() => {
    (async () => {
      const body = await response.getBody();
      setBody(body);
    })();
  }, [response]);

  const renderHeaders = () => {
    return Object.entries(response.getHeaders()).map(([key, value]) => (
      <View key={key} style={styles.headerItem}>
        <Text
          style={[
            styles.headerKey,
            {
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.medium,
            },
          ]}
        >
          {key}:
        </Text>
        <Text
          style={[
            styles.headerValue,
            {
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.regular,
            },
          ]}
        >
          {value}
        </Text>
      </View>
    ));
  };

  const tabs = [
    {
      key: "body",
      title: "Body",
      content: (
        <View style={styles.tabContent}>
          <View style={styles.codeHeader}>
            <Text
              style={[
                styles.codeType,
                {
                  color: theme.colors.subtext,
                  fontFamily: theme.typography.fontFamily.medium,
                },
              ]}
            >
              {typeof body === "object" ? "JSON" : "Text"}
            </Text>
          </View>
          <ScrollView
            style={[
              styles.codeContainer,
              {
                backgroundColor: theme.isDark ? "#1E1E1E" : "#F5F5F5",
                borderColor: theme.colors.border,
              },
            ]}
            horizontal
          >
            <ScrollView nestedScrollEnabled>
              <Text
                style={[
                  styles.codeText,
                  {
                    color: theme.colors.text,
                    fontFamily: "monospace",
                  },
                ]}
              >
                {typeof body === "object" ? formatJson(body) : String(body)}
              </Text>
            </ScrollView>
          </ScrollView>
        </View>
      ),
    },
    {
      key: "headers",
      title: "Headers",
      content: (
        <View style={styles.tabContent}>
          <ScrollView
            style={[
              styles.headersContainer,
              {
                borderColor: theme.colors.border,
              },
            ]}
          >
            {renderHeaders()}
          </ScrollView>
        </View>
      ),
    },
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
          marginTop: theme.spacing.m,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: getStatusColor(response._element.status),
              },
            ]}
          >
            <Text
              style={[
                styles.statusCode,
                {
                  color: "#FFFFFF",
                  fontFamily: theme.typography.fontFamily.semibold,
                },
              ]}
            >
              {status}
            </Text>
          </View>
          <Text
            style={[
              styles.statusText,
              {
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily.medium,
              },
            ]}
          >
            {response._element.statusText}
          </Text>
        </View>

        <View style={styles.metaContainer}>
          <Text
            style={[
              styles.timeText,
              {
                color: theme.colors.subtext,
                fontFamily: theme.typography.fontFamily.regular,
              },
            ]}
          >
            {true ? `${response._time}ms` : ""}
          </Text>
          {expanded ? (
            <ChevronUp size={20} color={theme.colors.subtext} />
          ) : (
            <ChevronDown size={20} color={theme.colors.subtext} />
          )}
        </View>
      </TouchableOpacity>

      {expanded && <TabView tabs={tabs} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusCode: {
    fontSize: 12,
  },
  statusText: {
    fontSize: 14,
    marginLeft: 8,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    marginRight: 8,
  },
  tabContent: {
    padding: 16,
  },
  codeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  codeType: {
    fontSize: 12,
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  copiedText: {
    fontSize: 12,
    marginLeft: 4,
  },
  codeContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
  },
  codeText: {
    fontSize: 12,
  },
  headersContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
  },
  headerItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  headerKey: {
    fontSize: 14,
    marginRight: 4,
  },
  headerValue: {
    fontSize: 14,
    flexShrink: 1,
  },
});
