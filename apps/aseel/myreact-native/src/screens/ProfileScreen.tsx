import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../hooks/use-auth";
import { Header } from "../components/common/Header";

export const ProfileScreen = () => {
  const { customer, logout } = useAuth();
  const [fullCustomerData, setFullCustomerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customer) {
      setFullCustomerData(customer);
      setLoading(false);
    } else {
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [customer]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: logout, style: "destructive" },
    ]);
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  const phoneValue = fullCustomerData?.phoneNumber || fullCustomerData?.phone;
  const cityValue = fullCustomerData?.city;

  return (
    <View style={styles.container}>
      <Header title="Profile" showLogout={false} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {fullCustomerData?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>
              {fullCustomerData?.fullName || "N/A"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{fullCustomerData?.email || "N/A"}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>
              {phoneValue && phoneValue !== "Not provided"
                ? phoneValue
                : "Not provided"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>
              {cityValue && cityValue !== "Not provided"
                ? cityValue
                : "Not provided"}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Event Planner v1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f3ff" },
  content: { padding: 16, alignItems: "center" },
  avatarContainer: { marginTop: 20, marginBottom: 24 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4f46e5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },
  avatarText: { fontSize: 40, fontWeight: "bold", color: "#fff" },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: "100%",
  },
  infoRow: { paddingVertical: 12 },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#9ca3af",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  value: { fontSize: 16, color: "#1a1a2e", fontWeight: "500" },
  divider: { height: 1, backgroundColor: "#f3f4f6" },
  logoutButton: {
    marginTop: 24,
    backgroundColor: "#fee2e2",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  logoutText: { color: "#ef4444", fontSize: 16, fontWeight: "600" },
  version: { marginTop: 24, color: "#9ca3af", fontSize: 12 },
});
