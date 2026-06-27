import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type Venue = {
  _id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  price: number;
  images: string[];
};

type EventCardProps = {
  venue: Venue;
  onPress: (venue: Venue) => void;
  style?: ViewStyle;
};

export const EventCard: React.FC<EventCardProps> = ({
  venue,
  onPress,
  style,
}) => {
  const { name, location, price, capacity, images } = venue;

  const imageUrl = images && images.length > 0 ? images[0] : null;

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() => onPress(venue)}
      activeOpacity={0.7}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>🏢</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <View style={styles.details}>
          <Text style={styles.location}>📍 {location}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${price}</Text>
            <Text style={styles.priceUnit}>/day</Text>
          </View>
          <Text style={styles.capacity}>👥 {capacity} people</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 48,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: 4,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: "#6b7280",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4f46e5",
  },
  priceUnit: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 2,
  },
  capacity: {
    fontSize: 14,
    color: "#6b7280",
  },
});
