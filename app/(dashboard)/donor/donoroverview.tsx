import { StyleSheet, Text, View,ScrollView, } from 'react-native';

import React from 'react'

const Donor = () => {
  return (
    <ScrollView style={styles.donorContainer}>

    <View>
      <Text>Donor</Text>
    </View>

    </ScrollView>

   
  )
}

export default Donor

const styles = StyleSheet.create({

  donorContainer:{
    height:'100%',
    width:'100%',
    backgroundColor:'white',
 
  }
})