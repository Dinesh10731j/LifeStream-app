import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { UseViewHistory } from '@/hooks/useViewHistory';
import { Table, Row } from 'react-native-table-component';

const UserHistory = () => {
  const { id } = useLocalSearchParams();
  const decodedEmail = typeof id === 'string' ? id : '';
  const { data: userHistory, error, isLoading } = UseViewHistory(decodedEmail);

  // Table headers and column widths
  const tableHead = ['Name', 'Email', 'Status', 'Blood Group'];
  const widthArr = [150, 400, 120, 190];

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size={30} color="blue" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  // Prepare data for the table
  const tableData =
    userHistory?.data?.map((history: any) => [
      history.fullName,
      history.email,
      history.status,
      history.bloodGroup,
    ]) || [];

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
          <Text style={styles.title}>User Profile History</Text>
        </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
       

        <Table borderStyle={styles.tableBorder}>
          <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text} />
            {tableData.length > 0 ? (
            tableData.map((rowData: string[], index: number) => (
              <Row key={index} data={rowData} widthArr={widthArr} style={styles.row} textStyle={styles.text} />
            ))
            ) : (
            <Text style={styles.noData}>Data not found</Text>
            )}
        </Table>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f1f1',
  },
  row: {
    backgroundColor: '#fff',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },

});

export default UserHistory;
