import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
const SuccessImage = require("@/assets/images/mission.png");

const Mission = () => {
  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInUp.duration(500)} style={styles.section}>
        <Text style={styles.heading}>Our Mission</Text>
        <Animated.Text entering={FadeInUp.delay(400).duration(500)} style={styles.paragraph}>
          Our Mission is to inspire, promote, and facilitate blood
          donation in Nepal. We aim to educate the public
          about the critical need for blood donors and to create a reliable and
          accessible blood donation network.
        </Animated.Text>
      </Animated.View>
      
      <View style={styles.imageContainer}>
        <Image 
          source={SuccessImage} 
          style={styles.image} 
          
        />
      </View>
    </ScrollView>
  );
};

export default Mission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 300,
    height:400,
    borderRadius: 10,
  },
});
