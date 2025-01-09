import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Trash2} from 'lucide-react-native'
import { UseReceiptantHistory } from '@/hooks/useReceiptantRequestHistory';
import { UseDeleteRequest } from '@/hooks/useDeleteRequest';


const getBackgroundColorClass = (urgency:string) => {
  switch (urgency.toLowerCase()) {
    case 'yes':
      return { backgroundColor: '#F78FB3' };
    case 'no':
      return { backgroundColor: '#7BED9F' }; 
    default:
      return { backgroundColor: '#95A5A6' };
  }
};



const RequestHistory = () => {
  const receipentRequestHistory = UseReceiptantHistory();
  const deleteRequestMutation = UseDeleteRequest();

  const handleDeleteRequest = (requestId:string) => {
  
    deleteRequestMutation.mutate(requestId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {receipentRequestHistory?.isPending ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : receipentRequestHistory?.isError ? (
        <Text style={styles.errorText}>Error loading request history</Text>
      ) : receipentRequestHistory?.data && receipentRequestHistory.data.length > 0 ? (
        receipentRequestHistory.data.map((request:any) => (
          <View
            key={request._id}
            style={[
              styles.card,
              getBackgroundColorClass(request.urgency),
            ]}
          >
            <TouchableOpacity
              style={styles.trashIcon}
              onPress={() => handleDeleteRequest(request._id)}
            >
              <Trash2  size={20} color="#FF0000" />
            </TouchableOpacity>
            <Text style={[styles.cardText, styles.bold]}>Full Name: {request.fullName}</Text>
            <Text
              style={[
                styles.urgencyBadge,
                request.urgency.toLowerCase() === 'yes'
                  ? { backgroundColor: '#FF6F61' }
                  : { backgroundColor: '#28A745' },
              ]}
            >
              Urgency: {request.urgency}
            </Text>
            <Text style={styles.cardText}>Email: {request.email}</Text>
            <Text style={styles.cardText}>Quantity: {request.quantity}</Text>
            <Text style={styles.cardText}>Message: {request.message}</Text>
            <Text style={[styles.cardText, styles.bold]}>Blood Group: {request.bloodGroup}</Text>
            <Text style={styles.cardText}>
              Status:
              <Text
                style={[
                  styles.statusText,
                  request.status === 'Pending'
                    ? { color: '#FFC107' }
                    : request.status === 'Accepted'
                    ? { color: '#28A745' }
                    : request.status === 'Rejected'
                    ? { color: '#FF0000' }
                    : {},
                ]}
              >
                {' '}
                {request.status}
              </Text>
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>Blood request history not found</Text>
      )}
    </ScrollView>
  );
};

export default RequestHistory;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  trashIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cardText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
  },
  urgencyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: '#FFF',
    marginBottom: 8,
  },
  statusText: {
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 16,
  },
  noDataText: {
    color: '#FF0000',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 16,
  },
});
