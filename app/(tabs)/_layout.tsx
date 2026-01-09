import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

// Balatro-inspired dark theme colors
const COLORS = {
  background: '#1a1a2e',
  surface: '#16213e',
  primary: '#e94560',
  text: '#eaeaea',
  accent: '#ffd700',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.text,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: '#2a2a4e',
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sparkles" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Hide the explore tab
        }}
      />
    </Tabs>
  );
}
