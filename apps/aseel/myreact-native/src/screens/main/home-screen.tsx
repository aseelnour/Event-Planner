import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../context/auth-context";

export const HomeScreen = ({ navigation }: any) => {
  const { customer } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.email}>{customer?.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Bookings")}
        >
          <Text style={styles.actionText}>📅 My Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Messages")}
        >
          <Text style={styles.actionText}>💬 Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Explore")}
        >
          <Text style={styles.actionText}>🔍 Explore Events</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Upcoming Events</Text>
        <Text style={styles.emptyText}>No upcoming events</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3ff",
  },
  header: {
    padding: 24,
    backgroundColor: "#4f46e5",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 16,
    color: "#c7d2fe",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#f5f3ff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  actionText: {
    fontSize: 16,
    color: "#1a1a2e",
  },
  emptyText: {
    color: "#9ca3af",
    textAlign: "center",
    paddingVertical: 20,
  },
});
