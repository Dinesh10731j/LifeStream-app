
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ReactQueryProvider from '../react-query-provider';
export default function TabLayout() {
  return (
    <>
    <ReactQueryProvider>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#D32F2F',
          tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#f8c8d8',
          borderTopLeftRadius: 20,   
          borderTopRightRadius: 20,   
          height: 60,                 
          paddingBottom: 5,          
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
    </ReactQueryProvider>

    </>

  );

}
