import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useAuth } from "../../context/auth-context";
import { api } from "../../api/client";

type Booking = {
  _id: string;
  venueId: string;
  date: string;
  timePeriod: { from: string; to: string }[];
  status: string;
};

export const BookingsScreen = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useAuth();

  const fetchBookings = async () => {
    try {
      const response = await api.get("/api/customer-system/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBookings();
    }
  }, [token]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <Text style={styles.subtitle}>{bookings.length} bookings found</Text>
      </View>

      {bookings.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>📅</Text>
          <Text style={styles.emptyTitle}>No bookings yet</Text>
          <Text style={styles.emptyText}>
            Start exploring events and make your first booking!
          </Text>
        </View>
      ) : (
        bookings.map((booking) => (
          <View key={booking._id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.venueName}>Venue ID: {booking.venueId}</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      booking.status === "confirmed" ? "#d1fae5" : "#fef3c7",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        booking.status === "confirmed" ? "#065f46" : "#92400e",
                    },
                  ]}
                >
                  {booking.status || "pending"}
                </Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.cardText}>
                📅 {new Date(booking.date).toLocaleDateString()}
              </Text>
              {booking.timePeriod.map((period, index) => (
                <Text key={index} style={styles.cardText}>
                  ⏰ {period.from} - {period.to}
                </Text>
              ))}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3ff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 24,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 40,
    margin: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  emptyText: {
    color: "#9ca3af",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 16,
    marginTop: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  venueName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  cardBody: {
    padding: 16,
  },
  cardText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
});
