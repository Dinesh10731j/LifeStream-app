import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { UseManageBloodRequest } from '@/hooks/useManageBloodRequest';
import { BloodRequestType } from '@/Types';
import { UseRejectRequest } from '@/hooks/useRejectRequest';
import { UseAcceptRequest } from '@/hooks/useAcceptRequest';
import { CheckIcon, X } from 'lucide-react-native';

const ManageReceiptant = () => {
  const { data: bloodRequest, isLoading, isError } = UseManageBloodRequest();

  const rejectRequest = UseRejectRequest();
  const acceptRequest = UseAcceptRequest();

  const handleAccept = (id: string) => {
    acceptRequest.mutate(id);
  };

  const handleReject = (id: string) => {
    rejectRequest.mutate(id);
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={40} color="blue" />
        <Text>Loading requests...</Text>
      </View>
    );
  }

  if (isError || !bloodRequest?.data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to fetch data. Please try again.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: BloodRequestType<string> }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.fullName}</Text>
      <Text style={styles.info}>Blood Group: {item.bloodGroup.toUpperCase()}</Text>
      <Text style={styles.info}>Quantity: {item.quantity} units</Text>
      <Text style={styles.info}>Message: {item.message}</Text>
      <Text
        style={[styles.status, item.status === 'Accepted' ? styles.accepted : styles.rejected]}
      >
        {item.status}
      </Text>
      <Text style={styles.date}>Requested On: {new Date(item.requestdate).toDateString()}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={() => handleAccept(item._id)}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Accept</Text>
            {item.status === 'Accepted' && <CheckIcon size={18} color="white" />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleReject(item._id)}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Reject</Text>
            {item.status === 'Rejected' && <X size={18} color="white" />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={bloodRequest.data}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListHeaderComponent={<Text style={styles.title}>Recipient Requests</Text>}
      ListEmptyComponent={<Text style={styles.errorText}>No requests available.</Text>}
    />
  );
};

export default ManageReceiptant;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    marginTop: 5,
  },
  status: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    borderRadius: 5,
  },
  accepted: {
    color: 'green',
    backgroundColor: '#e6f9e6',
  },
  rejected: {
    color: 'red',
    backgroundColor: '#f9e6e6',
  },
  date: {
    marginTop: 8,
    fontSize: 14,
    color: 'gray',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
