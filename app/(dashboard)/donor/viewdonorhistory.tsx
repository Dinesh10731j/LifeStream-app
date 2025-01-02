import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { UseDonorHistory } from '@/hooks/useDonorDonationHistory';

interface DonationItem {
  _id: string;
  fullName: string;
  email: string;
  donationType: string;
  phoneNumber: string;
  date: string;
  status: string;
}

interface ViewHistoryProps {
  email: string;
}

const ViewDonationHistory: React.FC<ViewHistoryProps> = () => {
  const { isLoading, data, isError } = UseDonorHistory();

  const tableHead = ['Name', 'Email', 'Donation Type', 'Phone', 'Date', 'Status'];
  const widthArr = [150, 300, 120, 180, 150, 150];
  const tableData = data?.map((item: DonationItem) => [
    item.fullName,
    item.email,
    item.donationType,
    item.phoneNumber,
    new Date(item.date).toLocaleDateString(),
    item.status,
  ]) || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donation History</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : isError ? (
        <Text style={styles.error}>Error occurred while fetching data.</Text>
      ) : data?.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text} />
              <Rows data={tableData} widthArr={widthArr} style={styles.text} />
            </Table>
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.noData}>Donation history not found</Text>
      )}
    </View>
  );
};

export default ViewDonationHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});
