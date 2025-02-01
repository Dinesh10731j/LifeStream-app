import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Image,View,TouchableOpacity,StyleSheet } from 'react-native';
import { LayoutDashboardIcon,UserSearchIcon,HandHeartIcon,HistoryIcon,LogOut} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { UseUserProfile } from '@/hooks/useUserProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactQueryProvider from '@/app/react-query-provider';
export default function AdminLayout() {
  const router = useRouter();
  const {data} =UseUserProfile();

  const handleLogout = () => {
    router.replace('/');
    AsyncStorage.removeItem('userId');
    AsyncStorage.removeItem('role');
  };

  return (
    <ReactQueryProvider>
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
          name="receiptantoverview"
          options={{
            drawerLabel: "Receiptant Overview",
            title: 'Receiptant Overview',
            drawerIcon: ({ color, size }) => (
              <LayoutDashboardIcon color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="requestblood"
          options={{
            drawerLabel: 'Request Blood',
            title: 'Request Blood',
            drawerIcon: ({ color, size }) => (
              <HandHeartIcon color={color} size={size} />
            ),
          }}
        />
       
        <Drawer.Screen
          name="searchdonor"
          options={{
            drawerLabel: 'Search Donor',
            title: 'Search Donor',
            drawerIcon: ({ color, size }) => (
              <UserSearchIcon color={color} size={size} />
            ),
          }}
        />

<Drawer.Screen
          name="viewrequesthistory"
          options={{
            drawerLabel: "View Request History",
            title: 'View Request History',
            drawerIcon: ({ color, size }) => (
              <HistoryIcon color={color} size={size} />
            ),
          }}
        />
      </Drawer>

      
    </GestureHandlerRootView>
    </ReactQueryProvider>
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
