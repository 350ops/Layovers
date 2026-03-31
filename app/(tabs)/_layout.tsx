import { Tabs } from 'expo-router';
import React from 'react';
import { useBusinessMode } from '@/contexts/BusinesModeContext';
import { useThemeColors } from '@/contexts/ThemeColors';
import * as LucideIcons from 'lucide-react-native';

export default function Layout() {
  const { isBusinessMode } = useBusinessMode();
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.placeholder,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.border,
        },
      }}>
      {/* Consumer tabs */}
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <LucideIcons.Map color={color} size={size} />,
          href: isBusinessMode ? null : '/(tabs)/search',
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, size }) => <LucideIcons.MessageSquare color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: 'Book',
          tabBarIcon: ({ color, size }) => <LucideIcons.Sailboat color={color} size={size} />,
          href: isBusinessMode ? null : '/(tabs)/book',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <LucideIcons.UserCircle color={color} size={size} />,
        }}
      />

      {/* Operator tabs */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <LucideIcons.BarChart3 color={color} size={size} />,
          href: isBusinessMode ? '/(tabs)/dashboard' : null,
        }}
      />
      <Tabs.Screen
        name="listings"
        options={{
          title: 'Listings',
          tabBarIcon: ({ color, size }) => <LucideIcons.List color={color} size={size} />,
          href: isBusinessMode ? '/(tabs)/listings' : null,
        }}
      />
    </Tabs>
  );
}
