import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useAuth } from "../../hooks/use-auth";

type HeaderProps = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showLogout?: boolean;
  rightComponent?: React.ReactNode;
  style?: ViewStyle;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  showLogout = false,
  rightComponent,
  style,
}) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        {rightComponent}
        {showLogout && (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    minHeight: 60,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  backIcon: {
    fontSize: 24,
    color: "#1a1a2e",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 14,
    color: "#ef4444",
    fontWeight: "500",
  },
});
