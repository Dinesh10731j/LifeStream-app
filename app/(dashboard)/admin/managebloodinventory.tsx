import { StyleSheet, Text, View, ScrollView, SafeAreaView,ActivityIndicator} from "react-native";
import React from "react";
import { Usedonationinfo } from "@/hooks/userBloodInventory";
import { CircleUserIcon, Heart } from "lucide-react-native";


const ManageBloodInventory = () => {
  const { data: donationinfo,isLoading } = Usedonationinfo();

  return (
    <SafeAreaView style={styles.inventoryContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>Blood Inventory Overview</Text>

        <View style={styles.card}>
          <Heart color="#FF6347" size={48} />
          <Text style={styles.cardTitle}>Total Donations</Text>
          <Text style={styles.cardValue}>
            {donationinfo?.totalDonations ?? 0}
          </Text>
        </View>

        <View style={styles.card}>
          <CircleUserIcon color="#4682B4" size={48} />
          <Text style={styles.cardTitle}>Total Donors</Text>
          <View>
  {isLoading ? (
    <ActivityIndicator size={30} animating={true} color="blue" />
  ) : (
    <Text style={styles.cardValue}>{donationinfo?.totalDonors ?? 0}</Text>
  )}
</View>

       
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageBloodInventory;

const styles = StyleSheet.create({
  inventoryContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    elevation: 7, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    color: "#555",
    marginTop: 12,
  },
  cardValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111",
    marginTop: 8,
  },
});
