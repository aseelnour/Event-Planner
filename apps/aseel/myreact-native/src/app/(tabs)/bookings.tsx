// C:\Users\Osaid\GFA\event-planner\apps\aseel\myreact-native\src\app\(tabs)\bookings.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useAuth } from "../../hooks/use-auth";
import { api } from "../../api/client";

type Booking = {
  _id: string;
  venueId: string;
  date: string;
  timePeriod: { from: string; to: string }[];
  status: string;
};

export default function BookingsScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [venues, setVenues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useAuth();

  // ✅ جلب الفعاليات - استخدام المسار الصحيح (بدون تكرار)
  const fetchVenues = async () => {
    try {
      // ❌ خطأ: api.get("/api/customer-system/customer/venues")
      // ✅ صحيح: api.get("/venues") لأن baseURL يحتوي على /api/customer-system/customer
      const response = await api.get("/venues");
      console.log("📡 Venues Response:", response.data);

      const venuesMap: Record<string, string> = {};
      if (Array.isArray(response.data)) {
        response.data.forEach((v: any) => {
          venuesMap[v._id] = v.title || "Unknown Venue";
        });
      }
      setVenues(venuesMap);
    } catch (error) {
      console.error("❌ Error fetching venues:", error);
    }
  };

  // ✅ جلب الحجوزات
  const fetchBookings = async () => {
    try {
      // ✅ صحيح: api.get("/bookings")
      const response = await api.get("/bookings");
      console.log("📡 Bookings Response:", response.data);
      setBookings(response.data);
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ✅ جلب البيانات عند تحميل الشاشة
  useEffect(() => {
    if (token) {
      fetchVenues();
      fetchBookings();
    }
  }, [token]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchVenues();
    fetchBookings();
  };

  const getVenueName = (venueId: string): string => {
    if (venues[venueId]) {
      return venues[venueId];
    }
    if (venueId.startsWith("6a283b")) {
      return "🗑️ Deleted Venue";
    }
    return `Venue ${venueId.slice(0, 8)}...`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return { bg: "#d1fae5", text: "#065f46" };
      case "cancelled":
        return { bg: "#fee2e2", text: "#991b1b" };
      default:
        return { bg: "#fef3c7", text: "#92400e" };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "✅ Confirmed";
      case "cancelled":
        return "❌ Cancelled";
      default:
        return "⏳ Pending";
    }
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
        bookings.map((booking) => {
          const statusColors = getStatusColor(booking.status);
          return (
            <View key={booking._id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.venueInfo}>
                  <Text style={styles.venueName}>
                    {getVenueName(booking.venueId)}
                  </Text>
                  <Text style={styles.venueId}>
                    ID: {booking.venueId.slice(0, 12)}...
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: statusColors.bg },
                  ]}
                >
                  <Text
                    style={[styles.statusText, { color: statusColors.text }]}
                  >
                    {getStatusLabel(booking.status)}
                  </Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.cardText}>
                  📅{" "}
                  {new Date(booking.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
                {booking.timePeriod?.map((period, index) => (
                  <Text key={index} style={styles.cardText}>
                    ⏰ {period.from} - {period.to}
                  </Text>
                ))}
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

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
  venueInfo: {
    flex: 1,
    marginRight: 8,
  },
  venueName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  venueId: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
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
