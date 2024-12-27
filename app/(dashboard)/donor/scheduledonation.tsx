import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView,ActivityIndicator,TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { ScheduleDonationFormData } from '@/Types';
import { UseScheduleDonation } from '@/hooks/useScheduleDonation';
import Toast from 'react-native-toast-message';

const Scheduledonation = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<ScheduleDonationFormData>();
  const scheduleDonation = UseScheduleDonation(); 
  const onSubmit = (data: ScheduleDonationFormData) => {
    scheduleDonation.mutate(data, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Donation Scheduled',
          text2: 'Your donation has been successfully scheduled!',
          position: 'top'
        });
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to schedule donation. Please try again.',
          position: 'top'
        });
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Schedule a Donation</Text>
      <View style={styles.form}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="fullName"
          rules={{ required: 'Full Name is required' }}
        />
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
          rules={{ required: 'Email is required' }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="phoneNumber"
          rules={{ required: 'Phone Number is required' }}
        />
        {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>}

        <Text style={styles.label}>Donation Type</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label="Whole Blood" value="Whole Blood" />
              <Picker.Item label="Plasma" value="Plasma" />
              <Picker.Item label="Platelets" value="Platelets" />
            </Picker>
          )}
          name="donationType"
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Date"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="date"
          rules={{ required: 'Date is required' }}
        />
        {errors.date && <Text style={styles.errorText}>{errors.date.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Time"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="time"
          rules={{ required: 'Time is required' }}
        />
        {errors.time && <Text style={styles.errorText}>{errors.time.message}</Text>}

        <Text style={styles.label}>Location Type</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label="Blood Bank" value="Blood Bank" />
              <Picker.Item label="Donation Camp" value="Donation Camp" />
            </Picker>
          )}
          name="locationType"
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Location Address"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="address"
          rules={{ required: 'Location Address is required' }}
        />
        {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}

        {/* Additional fields */}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Medication"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="medication"
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Chronic Diseases"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="chronicDiseases"
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Previous Donation Date"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="previousDonationDate"
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Additional Notes"
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
          name="notes"
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Blood Quantity (ml)"
              keyboardType="numeric"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="bloodQuantity"
          rules={{ required: 'Blood Quantity is required' }}
        />
        {errors.bloodQuantity && <Text style={styles.errorText}>{errors.bloodQuantity.message}</Text>}

        <Text style={styles.label}>Blood Group</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
            </Picker>
          )}
          name="bloodGroup"
          rules={{ required: 'Blood Group is required' }}
        />

<TouchableOpacity
          style={styles.scheduleButton}
          onPress={handleSubmit(onSubmit)}
          disabled={scheduleDonation.isPending}
        >
          {scheduleDonation.isPending ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <Text style={styles.buttonText}>Schedule Donation</Text>
          )}
        </TouchableOpacity>

      </View>
      <Toast/>
    </ScrollView>
  );
};

export default Scheduledonation;

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },

  scheduleButton:{
    backgroundColor:'#ef4444',
    width:'100%',
    paddingVertical:15,
  
  },
  buttonText:{
    color:'#fff',
    fontWeight:'500',
    textAlign:'center'
  }
});
