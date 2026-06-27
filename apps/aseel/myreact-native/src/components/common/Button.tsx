import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "medium",
  style,
  textStyle,
}) => {
  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
      case "outline":
        return styles.outline;
      case "danger":
        return styles.danger;
      default:
        return styles.primary;
    }
  };

  const getTextVariantStyles = (): TextStyle => {
    switch (variant) {
      case "primary":
        return styles.primaryText;
      case "secondary":
        return styles.secondaryText;
      case "outline":
        return styles.outlineText;
      case "danger":
        return styles.dangerText;
      default:
        return styles.primaryText;
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case "small":
        return styles.small;
      case "medium":
        return styles.medium;
      case "large":
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const getTextSizeStyles = (): TextStyle => {
    switch (size) {
      case "small":
        return styles.smallText;
      case "medium":
        return styles.mediumText;
      case "large":
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? "#4f46e5" : "#fff"}
          size="small"
        />
      ) : (
        <Text style={[getTextVariantStyles(), getTextSizeStyles(), textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  disabled: {
    opacity: 0.5,
  },
  // Variants
  primary: {
    backgroundColor: "#4f46e5",
  },
  secondary: {
    backgroundColor: "#6b7280",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#4f46e5",
  },
  danger: {
    backgroundColor: "#ef4444",
  },
  // Text Variants
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: "#fff",
  },
  outlineText: {
    color: "#4f46e5",
  },
  dangerText: {
    color: "#fff",
  },
  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});
