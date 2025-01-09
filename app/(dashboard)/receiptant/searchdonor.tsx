import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { UseDonorInfo } from '@/hooks/useTotalDonation';

const SearchDonor = () => {
  const { isLoading, isError, data } = UseDonorInfo();
  const [valueSort, setValueSort] = useState('');
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleValueSortChange = (value:string) => setValueSort(value);
  const handleStatusChange = (value:string) => setStatus(value);
  const handleSearchChange = (text:string) => setSearchTerm(text);

  // Filter and sort data
  const filteredData = data?.filter((donor:any) => {
    return (
      donor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (status ? donor.status.toLowerCase() === status.toLowerCase() : true)
    );
  });

  const sortedData = filteredData?.sort((a:any, b:any) => {
    if (valueSort === 'highest') {
      return b.total - a.total;
    } else if (valueSort === 'lowest') {
      return a.total - b.total;
    } else {
      return 0;
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Donor</Text>
      <View style={styles.filters}>
        <TextInput
          style={styles.input}
          placeholder="Search Donor"
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
        <Picker
          selectedValue={valueSort}
          style={styles.picker}
          onValueChange={handleValueSortChange}
          placeholder='Sort by value'
        >
          <Picker.Item label="Sort by Value" value="" />
          <Picker.Item label="Highest" value="highest" />
          <Picker.Item label="Lowest" value="lowest" />
        </Picker>
        <Picker
          selectedValue={status}
          style={styles.picker}
          onValueChange={handleStatusChange}
          placeholder='Sort by status '
        >
          <Picker.Item label="Status" value="" />
          <Picker.Item label="Pending" value="pending" />
          <Picker.Item label="Accepted" value="accepted" />
        </Picker>
      </View>
      <View style={styles.tableContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : isError ? (
          <Text style={styles.errorText}>Error occurred while fetching data.</Text>
        ) : (
          <FlatList
            data={sortedData}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{index + 1}</Text>
                <Text style={styles.cell}>{item.fullName}</Text>
                <Text style={styles.cell}>{item.total}</Text>
                <Text
                  style={[
                    styles.cell,
                    { color: item.status === 'Pending' ? '#FFA500' : '#28A745' },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
    height: 40,
  },
  picker: {
    flex: 1,
    height: 40,
    marginLeft: 8,
  },
  tableContainer: {
    flex: 1,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
});

export default SearchDonor;
