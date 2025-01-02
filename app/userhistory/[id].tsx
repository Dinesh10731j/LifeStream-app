import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { UseViewHistory } from '@/hooks/useViewHistory';
import { Table, Row } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
interface UserHistoryData {
  fullName: string;
  email: string;
  status: string;
  bloodGroup: string;
}

interface UserHistoryResponse {
  data: UserHistoryData[];
}

const UserHistory: React.FC = () => {
  const { id } = useLocalSearchParams();
  const decodedEmail = typeof id === 'string' ? id : '';
  const { data: userHistory, error, isLoading } = UseViewHistory(decodedEmail);

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

  return (
    <GestureHandlerRootView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>User Profile History</Text>
      </View>
      <Table borderStyle={styles.tableBorder}>
        <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text} />
       
        {userHistory?.data?.length > 0 ? (
          userHistory.data.map((item:UserHistoryData, index:number) => (
            <Row
              key={index} 
              data={[item.fullName, item.email, item.status, item.bloodGroup]}
              widthArr={widthArr}
              style={styles.row}
              textStyle={styles.text}
            />
          ))
        ) : (
          <Text style={styles.noData}>Data not found</Text>
        )}
      </Table>
      </SafeAreaView>
      </ScrollView>
   
    </GestureHandlerRootView>
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
