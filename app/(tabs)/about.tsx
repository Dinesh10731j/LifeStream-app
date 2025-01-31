import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { ourTeam } from "@/utils/teamData";
import Animated, { FadeInUp } from "react-native-reanimated";
const dummyImage = require("@/assets/images/dummyteam.png")
const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInUp.duration(500)} style={styles.section}>
        <Text style={styles.heading}>Who We Are</Text>
        <Animated.Text entering={FadeInUp.delay(400).duration(500)} style={styles.paragraph}>
          At Lifestream, we are a dedicated team of healthcare professionals,
          volunteers, and community members committed to saving lives through
          blood donation. Our organization was founded in 2021 with a mission to
          ensure a safe and sufficient blood supply for those in need.
        </Animated.Text>
      </Animated.View>
      
      <Animated.View entering={FadeInUp.duration(500)} style={styles.section}>
        <Text style={styles.heading}>Why Blood Donation Matters</Text>
        <Animated.Text entering={FadeInUp.delay(400).duration(500)} style={styles.paragraph}>
          Every two seconds, someone in Nepal needs blood. Blood donations are
          essential for surgeries, cancer treatments, chronic illnesses, and
          traumatic injuries. Your single donation can save up to three lives
          and make a profound impact on patients and their families.
        </Animated.Text>
      </Animated.View>
      
      <Animated.View entering={FadeInUp.duration(500)} style={styles.centerSection}>
        <Text style={styles.heading}>Our Team</Text>
      </Animated.View>

      <View style={styles.teamContainer}>
        {ourTeam?.map((team, index) => (
          <Animated.View
            key={index}
            entering={FadeInUp.delay(400).duration(500)}
            style={styles.teamCard}
          >
            <Image source={dummyImage} style={styles.teamImage} />
            <Text style={styles.teamName}>{team.name}</Text>
            <Text>{team.team}</Text>
            <Text>{team.role}</Text>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  section: {
    marginBottom:40,
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
  centerSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  teamContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  teamCard: {
    backgroundColor: "rgba(26, 26, 26, 0.1)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  teamImage: {
    width:300,
    height:200,
    borderRadius: 10,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
