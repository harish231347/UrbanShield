import React from 'react';
import { Tabs } from 'expo-router';
import { Home, FileText, Map, Bell, User } from 'lucide-react-native';
import { Colors } from '@/lib/theme';

export default function CitizenTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary[600],
        tabBarInactiveTintColor: Colors.neutral[400],
        tabBarStyle: {
          backgroundColor: Colors.neutral[0],
          borderTopColor: Colors.neutral[100],
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontFamily: 'Inter-Medium', fontSize: 11 },
      }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="complaints"
        options={{ title: 'Complaints', tabBarIcon: ({ color, size }) => <FileText color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="nearby"
        options={{ title: 'Nearby', tabBarIcon: ({ color, size }) => <Map color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="notifications"
        options={{ title: 'Alerts', tabBarIcon: ({ color, size }) => <Bell color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tabs>
  );
}
