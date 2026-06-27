import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

import { HomeScreen } from "../screens/main/home-screen";
import { BookingsScreen } from "../screens/main/booking-screen";
import { MessagesScreen } from "../screens/main/messages-screen";
import { ProfileScreen } from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const tabIcons: Record<string, string> = {
  Explore: "🏠",
  Bookings: "📅",
  Messages: "💬",
  Profile: "👤",
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "#4f46e5",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "600",
        },
        tabBarActiveTintColor: "#4f46e5",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        tabBarIcon: ({ color, size }) => (
          <Text style={{ fontSize: size, color }}>
            {tabIcons[route.name as keyof typeof tabIcons] || "📌"}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Explore" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
