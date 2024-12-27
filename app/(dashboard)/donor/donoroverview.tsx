import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { UseDonorStats } from '@/hooks/useDonorStats';

const Donor = () => {
  const { data: donorStats, isPending, isError } = UseDonorStats();
  const chartData = {
    labels: ['Total Donations', 'Total Amount', 'Last Donation Date'],
    datasets: [
      {
        data: [
          donorStats?.totalDonations || 0,
          donorStats?.totalAmount || 0,
        
        ],
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.donorContainer}>
      {isPending ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : isError ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>Error loading donation stats</Text>
        </View>
      ) : (
        <View style={styles.center}>
          <Text style={styles.header}>Donor Donation Stats</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 20}
            height={250}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#e1f5fe',
              backgroundGradientTo: '#b3e5fc',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 10,
                padding:10
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Donor;

const styles = StyleSheet.create({
  donorContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
