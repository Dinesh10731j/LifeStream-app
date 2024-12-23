import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function AdminLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{headerShown:true,headerTintColor:'black',
      
        headerTitleStyle:{fontWeight:'bold'},headerStyle:{backgroundColor:'pink'},drawerStyle:{
          backgroundColor:'#cbd5e1 '
        }}}>
        <Drawer.Screen
          name="donationoverview"
          options={{ drawerLabel: 'Donation Overview', title: 'Donation Overview' }}
         
        />
        <Drawer.Screen
          name="managebloodinventory"
          options={{ drawerLabel: 'Manage Blood Request', title: 'Manage Blood Request' }}
         
        />
        <Drawer.Screen
          name="managereceiptant"
          options={{ drawerLabel: 'Manage Receiptant', title: 'Manage Receiptant' }}
          
        />

<Drawer.Screen
          name="manageusers"
          options={{ drawerLabel: 'Manage User', title: 'Manage User' }}
          
        />
        
      </Drawer>
    </GestureHandlerRootView>
  );
}



