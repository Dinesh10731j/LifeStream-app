import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Image,View,Text,TouchableOpacity,StyleSheet } from 'react-native';
import { LayoutDashboardIcon, Package, Users, ClipboardList,LogOut} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { UseUserProfile } from '@/hooks/useUserProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function AdminLayout() {
  const router = useRouter();
  const {data} =UseUserProfile();

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
          headerShadowVisible:false,
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
          name="donationoverview"
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
