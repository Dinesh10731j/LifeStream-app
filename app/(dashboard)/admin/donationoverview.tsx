import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { ActivityIndicator } from 'react-native-paper';
import { UsegetDonationstats } from '@/hooks/useGetDonationStats';

const DonationOverView = () => {
  const { isLoading, data: donationStats, isError, error } = UsegetDonationstats();

  const chartData = donationStats
    ? donationStats.map((item: { _id: any; total: any; }, index: number) => ({
        name: item._id,
        population: item.total,
        color: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ][index % 5],
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      }))
    : [];

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={30} animating={true} color="blue" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.adminContainer}>
      <Text style={styles.header}>Donation Overview</Text>
      {chartData.length > 0 ? (
        <View style={styles.chartContainer}>
          <PieChart
            data={chartData}
            width={320}
            height={220}
            chartConfig={{
              backgroundColor: '#000000',
              backgroundGradientFrom: '#FFFAFA',
              backgroundGradientTo: '#FFFAFA',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2,
              barPercentage: 0.5,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>
      ) : (
        <Text style={styles.errorText}>No data available.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  adminContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default DonationOverView;
