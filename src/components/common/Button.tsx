import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

type ButtonProps = {
  label?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  icon,
  iconPosition = "left",
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
  size = "medium",
}) => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.subtext + "40";

    switch (variant) {
      case "primary":
        return theme.colors.primary;
      case "secondary":
        return theme.colors.secondary;
      case "destructive":
        return theme.colors.error;
      case "outline":
      case "ghost":
        return "transparent";
      default:
        return theme.colors.primary;
    }
  };

  const getBorderColor = () => {
    if (disabled) return theme.colors.subtext + "40";

    switch (variant) {
      case "outline":
        return theme.colors.primary;
      default:
        return "transparent";
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.subtext;

    switch (variant) {
      case "primary":
      case "secondary":
      case "destructive":
        return "#FFFFFF";
      case "outline":
        return theme.colors.primary;
      case "ghost":
        return theme.colors.primary;
      default:
        return "#FFFFFF";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          paddingVertical: 6,
          paddingHorizontal: 12,
          fontSize: 14,
        };
      case "large":
        return {
          paddingVertical: 14,
          paddingHorizontal: 24,
          fontSize: 18,
        };
      default:
        return {
          paddingVertical: 10,
          paddingHorizontal: 16,
          fontSize: 16,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === "outline" ? 1 : 0,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "outline" || variant === "ghost"
              ? theme.colors.primary
              : "#FFFFFF"
          }
        />
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          {label && (
            <Text
              style={[
                styles.label,
                {
                  color: getTextColor(),
                  fontSize: sizeStyles.fontSize,
                  fontFamily: theme.typography.fontFamily.medium,
                  marginLeft: icon && iconPosition === "left" ? 8 : 0,
                  marginRight: icon && iconPosition === "right" ? 8 : 0,
                },
                textStyle,
              ]}
            >
              {label}
            </Text>
          )}
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  label: {
    textAlign: "center",
  },
  fullWidth: {
    width: "100%",
  },
});
