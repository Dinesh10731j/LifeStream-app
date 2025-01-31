
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#D32F2F',
          tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#f8c8d8', // Soft pink color
          borderTopLeftRadius: 20,    // Rounded top-left corner (screen's bottom-left)
          borderTopRightRadius: 20,   // Rounded top-right corner (screen's bottom-right)
          height: 60,                 // Optional: Adjust tab bar height
          paddingBottom: 5,           // Optional: Adjust content positioning
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => <Ionicons name="information-circle" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mission"
        options={{
          title: 'Mission',
          tabBarIcon: ({ color, size }) => <Ionicons name="flag" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="getstarted"
        options={{
          title: 'Get Started',
          tabBarIcon: ({ color, size }) => <Ionicons name="rocket" size={size} color={color} />,
        }}
      />
    </Tabs>

    </>

  );

}
