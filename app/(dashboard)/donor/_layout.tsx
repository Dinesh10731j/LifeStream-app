import Drawer from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LucideView, CalendarRange, User, LayoutDashboardIcon, LogOut } from "lucide-react-native";
import { UseUserProfile } from '@/hooks/useUserProfile';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DonorLayout = () => {
  const router = useRouter();
  const { data } = UseUserProfile();
 
  const handleLogout = () => {
    router.replace('/');
    AsyncStorage.removeItem('userId');
    AsyncStorage.removeItem('role');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitleStyle: { fontWeight: 'bold' },
          headerStyle: { backgroundColor: 'white' },
          headerShadowVisible: false,
          drawerStyle: {
            backgroundColor: '#131010',
          },
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: '#D32F2F',
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              {data && data?.name ? (
                <Image 
                  source={{ uri: `https://avatar.iran.liara.run/username?username=${data?.name}` }}
                  style={styles.avatar}
                />
              ) : null}
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <LogOut size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        <Drawer.Screen
          name="donoroverview"
          options={{
            drawerLabel: 'Donor Overview',
            title: 'Donor Overview',
            drawerIcon: ({ size, color }) => (
              <LayoutDashboardIcon color={color} size={size} />
            )
          }}
        />

        <Drawer.Screen
          name='viewdonorhistory'
          options={{
            drawerLabel: 'View Donation History',
            title: 'Donation History',
            drawerIcon: ({ size, color }) => (
              <LucideView size={size} color={color} />
            )
          }}
        />

        <Drawer.Screen
          name="scheduledonation"
          options={{
            drawerLabel: 'Schedule Donation',
            title: 'Schedule Donation',
            drawerIcon: ({ color, size }) => (
              <CalendarRange size={size} color={color} />
            )
          }}
        />

        <Drawer.Screen
          name="updatepersonalinformation"
          options={{
            drawerLabel: "Update Personal Information",
            title: 'Update Personal Information',
            drawerIcon: ({ size, color }) => (
              <User size={size} color={color} />
            )
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DonorLayout;

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 16,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
});
