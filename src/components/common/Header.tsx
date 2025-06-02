import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton,
  rightComponent,
}) => {
  const { theme } = useTheme();

  const handleBackPress = () => {};

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <SafeAreaView edges={["top"]}>
        <View style={styles.header}>
          <View style={styles.leftContainer}>
            {showBackButton && (
              <TouchableOpacity
                onPress={handleBackPress}
                style={styles.backButton}
              >
                <ArrowLeft size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.text,
                  fontFamily: theme.typography.fontFamily.semibold,
                },
              ]}
            >
              {title}
            </Text>
          </View>
          {rightComponent && (
            <View style={styles.rightContainer}>{rightComponent}</View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderBottomWidth: 1,
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  title: {
    fontSize: 18,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
