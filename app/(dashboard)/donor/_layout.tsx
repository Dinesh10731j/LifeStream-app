
import Drawer from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {LucideView,CalendarRange,User,LayoutDashboardIcon} from "lucide-react-native"

const DonorLayout = () => {
  return (
   <GestureHandlerRootView style={{flex:1}}>
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
name="donoroverview"
options={
    {
        drawerLabel:'Donor Overview',
        title:'Donor Overview',
        drawerIcon:({size,color})=>(

            <LayoutDashboardIcon color={color} size={size}/>


        )
    }
}


/>

<Drawer.Screen
 name='viewdonorhistory'
options={{
   
    drawerLabel:'View Donation History',
    title:'Donation History',
    drawerIcon:({size,color})=>(
        <LucideView size={size} color={color}/>
    )
}}
/>

<Drawer.Screen
name="scheduledonation"

options={{
    drawerLabel:'Schedule Donation',
    title:'Schedule Donation',
    drawerIcon:({color,size})=>(
        <CalendarRange size={size} color={color}/>
    )
}}
/>


<Drawer.Screen
name="updatepersonalinformation"
options={{
    drawerLabel:"Update Personal Information",
    title:'Update Personal Information',

    drawerIcon:({size,color})=>(
        <User size={size} color={color} />
    )
    

}}
/>


</Drawer>

   </GestureHandlerRootView>
  )
}

export default DonorLayout