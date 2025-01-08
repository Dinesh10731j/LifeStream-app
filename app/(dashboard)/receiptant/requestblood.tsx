import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { requestBloodType } from '@/Types';
import { UseRequestBlood } from '@/hooks/useRequestBlood';
import Toast from 'react-native-toast-message';
const RequestBlood = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm<requestBloodType>();
  
  const mutation = UseRequestBlood();

  const onSubmit = (data:requestBloodType) => {
    mutation.mutate(data);
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Blood</Text>
      
      <Controller
        control={control}
        name="fullName"
        rules={{ required: 'Full Name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.fullName && styles.errorInput]}
            placeholder="Full Name"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.errorInput]}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="bloodGroup"
        rules={{ required: 'Blood Group is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.bloodGroup && styles.errorInput]}
            placeholder="Blood Group"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.bloodGroup && <Text style={styles.errorText}>{errors.bloodGroup.message}</Text>}

      <Controller
        control={control}
        name="quantity"
        rules={{
          required: 'Quantity is required',
          pattern: { value: /^[1-9][0-9]*$/, message: 'Invalid quantity' }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.quantity && styles.errorInput]}
            placeholder="Quantity"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.quantity && <Text style={styles.errorText}>{errors.quantity.message}</Text>}

      <Controller
        control={control}
        name="urgency"
        rules={{ required: 'Urgency is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.urgency && styles.errorInput]}
            placeholder="Urgency Level"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.urgency && <Text style={styles.errorText}>{errors.urgency.message}</Text>}

      <Controller
        control={control}
        name="message"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.textArea}
            placeholder="Message (Optional)"
            multiline
            numberOfLines={4}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <View style={styles.buttonContainer}>
        <Button
          title={mutation.isPending ? 'Submitting...' : 'Submit'}
          onPress={handleSubmit(onSubmit)}
          color="#E63946"
        />
        {mutation.isPending && <ActivityIndicator size="small" color="#E63946" />}
        
        <Button
          title="Cancel"
          onPress={onCancel}
          color="#A8A8A8"
        />
      </View>
      <Toast/>
    </View>
    
  );
};

export default RequestBlood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    marginBottom: 10
  },
  errorText: {
    color: 'red',
    marginBottom: 10
  },
  errorInput: {
    borderColor: 'red'
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
