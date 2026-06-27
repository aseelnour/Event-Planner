// C:\Users\Osaid\GFA\event-planner\apps\aseel\myreact-native\src\app\(tabs)\profile.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useAuth } from "../../hooks/use-auth";
import { api } from "../../api/client";

type FullCustomer = {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  city: string;
  gender?: string;
  dob?: string;
};

export default function ProfileScreen() {
  const { customer, logout, token } = useAuth();
  const [profile, setProfile] = useState<FullCustomer | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProfile = async () => {
    try {
      console.log("🔍 Fetching profile...");
      const response = await api.get("/profile");
      console.log("✅ Profile response:", response.data);
      setProfile(response.data);
    } catch (error: any) {
      console.error("❌ Error fetching profile:", error);
      console.error("Response:", error.response?.data);

      // ✅ إذا كان هناك خطأ، استخدم البيانات من customer كحل مؤقت
      if (customer) {
        setProfile({
          _id: customer._id,
          email: customer.email,
          fullName: customer.fullName,
          phoneNumber: customer.phoneNumber || "Not provided",
          city: customer.city || "Not provided",
        });
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProfile();
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: logout, style: "destructive" },
    ]);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>No profile data available</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProfile}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {profile.fullName?.charAt(0)?.toUpperCase() || "U"}
          </Text>
        </View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{profile.fullName || "N/A"}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{profile.email || "N/A"}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>
            {profile.phoneNumber && profile.phoneNumber !== "Not provided"
              ? profile.phoneNumber
              : "Not provided"}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>City</Text>
          <Text style={styles.value}>
            {profile.city && profile.city !== "Not provided"
              ? profile.city
              : "Not provided"}
          </Text>
        </View>

        {profile.gender && (
          <>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.label}>Gender</Text>
              <Text style={styles.value}>{profile.gender}</Text>
            </View>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Event Planner v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f3ff" },
  centered: { justifyContent: "center", alignItems: "center" },
  content: { padding: 16, alignItems: "center" },
  avatarContainer: { marginTop: 20, marginBottom: 24, alignItems: "center" },
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
  name: { fontSize: 20, fontWeight: "bold", color: "#1a1a2e", marginTop: 12 },
  email: { fontSize: 14, color: "#6b7280", marginTop: 4 },
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
  errorText: { color: "#ef4444", fontSize: 16, textAlign: "center" },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#4f46e5",
    borderRadius: 8,
  },
  retryText: { color: "#fff", fontSize: 14, fontWeight: "600" },
});
