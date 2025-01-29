import { View, Text, Image, StyleSheet, StatusBar,ScrollView } from 'react-native';
import React from 'react';
import Animated, { FadeIn, SlideInDown, SlideInUp } from 'react-native-reanimated';
const bloodDonateImage = require('@/assets/images/donate_blood.jpg');
export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>

      <StatusBar hidden={true} barStyle="light-content" />

      {/* Title */}
      <Animated.Text entering={SlideInUp.springify()} style={styles.title}>
        Welcome to Lifestream
      </Animated.Text>

      {/* Subtitle */}
      <Animated.Text entering={FadeIn.duration(500).delay(200)} style={styles.subtitle}>
        Save Lives, Donate Blood. Every drop counts.
      </Animated.Text>

      {/* Description */}
      <Animated.Text entering={SlideInDown.springify().delay(400)} style={styles.description}>
        At Lifestream, we are dedicated to ensuring a safe and sufficient blood supply for those in need.
        Your blood donation can make a life-saving difference for patients undergoing surgeries, battling cancer,
        and facing unexpected emergencies.
      </Animated.Text>

      {/* Image */}
       <Animated.Image
        entering={SlideInUp.springify().delay(600)}
        source={bloodDonateImage}
        style={styles.image}
        resizeMode="contain"
      /> 
     
    </View>
    </ScrollView>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
  },
  description: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
    color: '#444',
    paddingHorizontal: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },

});
