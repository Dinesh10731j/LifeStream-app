import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { LayoutDashboardIcon, Package, Users, ClipboardList, User } from 'lucide-react-native';

export default function AdminLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitleStyle: { fontWeight: 'bold' },
          headerStyle: { backgroundColor: 'white' },
          headerShadowVisible:false,
          drawerStyle: {
            backgroundColor: '#131010',
          },
          drawerActiveTintColor: 'white',  
          drawerActiveBackgroundColor: '#D32F2F', 
        }}
      >
        <Drawer.Screen
          name="/userhistory[id]"
          options={{
            drawerLabel: 'Donation Overview',
            title: 'Donation Overview',
            drawerIcon: ({ color, size }) => (
              <LayoutDashboardIcon color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="managebloodinventory"
          options={{
            drawerLabel: 'Manage Blood Inventory',
            title: 'Manage Blood Inventory',
            drawerIcon: ({ color, size }) => (
              <Package color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="managereceiptant"
          options={{
            drawerLabel: 'Manage Recipient',
            title: 'Manage Recipient',
            drawerIcon: ({ color, size }) => (
              <ClipboardList color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="manageusers"
          options={{
            drawerLabel: 'Manage Users',
            title: 'Manage Users',
            drawerIcon: ({ color, size }) => (
              <Users color={color} size={size} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
