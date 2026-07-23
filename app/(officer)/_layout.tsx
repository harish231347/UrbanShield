import React from 'react';
import { Tabs } from 'expo-router';
import { LayoutDashboard, ListOrdered, Map, BarChart3, Siren, User } from 'lucide-react-native';
import { Colors } from '@/lib/theme';

export default function OfficerTabs() {
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
        options={{ title: 'Dashboard', tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="queue"
        options={{ title: 'Priority', tabBarIcon: ({ color, size }) => <ListOrdered color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="riskmap"
        options={{ title: 'Risk Map', tabBarIcon: ({ color, size }) => <Map color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="reports"
        options={{ title: 'Reports', tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="alerts"
        options={{ title: 'Alerts', tabBarIcon: ({ color, size }) => <Siren color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tabs>
  );
}
