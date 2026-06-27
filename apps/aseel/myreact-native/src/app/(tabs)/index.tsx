import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../hooks/use-auth";
import { router } from "expo-router";
import { api } from "../../api/client";

type Venue = {
  _id: string;
  title: string;
  description: string;
  location: string;
  capacity: number;
  price: string; // ✅ تغيير من number إلى string (لأن الباكند يرسل string)
  images: string[];
};

export default function HomeScreen() {
  const { customer } = useAuth();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllVenues, setShowAllVenues] = useState(false); // ✅ State للتحكم بعرض الكل

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const response = await api.get("/venues");
      console.log("✅ Venues:", response.data);
      setVenues(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ دالة للتنقل لصفحة التفاصيل (يمكنك تعديلها لاحقاً)
  const handleVenuePress = (venue: Venue) => {
    console.log("Venue selected:", venue.title);
    // router.push(`/(tabs)/venue/${venue._id}`);
  };

  // ✅ دالة لعرض/إخفاء جميع الفعاليات
  const toggleShowAllVenues = () => {
    setShowAllVenues(!showAllVenues);
  };

  // ✅ الفعاليات المراد عرضها (إما الكل أو أول 3)
  const displayedVenues = showAllVenues ? venues : venues.slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.email}>{customer?.email}</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/(tabs)/bookings")}
        >
          <Text style={styles.actionText}>📅 My Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/(tabs)/messages")}
        >
          <Text style={styles.actionText}>💬 Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/(tabs)/profile")}
        >
          <Text style={styles.actionText}>👤 Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Available Venues */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Available Venues</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#4f46e5"
            style={styles.loader}
          />
        ) : venues.length === 0 ? (
          <Text style={styles.emptyText}>No venues available</Text>
        ) : (
          <>
            {displayedVenues.map((venue) => (
              <TouchableOpacity
                key={venue._id}
                style={styles.venueItem}
                onPress={() => handleVenuePress(venue)}
              >
                <View style={styles.venueInfo}>
                  <Text style={styles.venueName}>{venue.title}</Text>
                  <Text style={styles.venueLocation}>📍 {venue.location}</Text>
                  <Text style={styles.venueDetails}>
                    👥 {venue.capacity} people • ${venue.price}/day
                  </Text>
                </View>
                <Text style={styles.venueArrow}>›</Text>
              </TouchableOpacity>
            ))}

            {/* ✅ زر عرض الكل / عرض أقل */}
            {venues.length > 3 && (
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={toggleShowAllVenues}
              >
                <Text style={styles.viewAllText}>
                  {showAllVenues
                    ? "Show Less ↑"
                    : `View All ${venues.length} Venues →`}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

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
  loader: {
    marginVertical: 20,
  },
  emptyText: {
    color: "#9ca3af",
    textAlign: "center",
    paddingVertical: 20,
  },
  venueItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: 4,
  },
  venueLocation: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  venueDetails: {
    fontSize: 13,
    color: "#4f46e5",
    fontWeight: "500",
  },
  venueArrow: {
    fontSize: 24,
    color: "#d1d5db",
    marginLeft: 12,
  },
  viewAllButton: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#f5f3ff",
    borderRadius: 12,
  },
  viewAllText: {
    color: "#4f46e5",
    fontWeight: "600",
    fontSize: 14,
  },
});
