import { StyleSheet, Text, View,SafeAreaView,ScrollView } from 'react-native'
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { UseViewHistory } from '@/hooks/useViewHistory';
import bs64 from "react-native-base64"
const UserHistory = () => {

    const { id } = useLocalSearchParams();
    const decodedEmail = typeof id === 'string' ? bs64.decode(id) : "";
    const {data:userHistory} = UseViewHistory(decodedEmail);

    console.log('This is userHistory',userHistory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View>
      <Text style={{color:'White'}}>UserHistory:{id}</Text>
    </View>

      </ScrollView>

    </SafeAreaView>
    
  )
}

export default UserHistory

const styles = StyleSheet.create({

  container:{
    height:'100%',
    width:'100%',
    backgroundColor:'white'
  }
})