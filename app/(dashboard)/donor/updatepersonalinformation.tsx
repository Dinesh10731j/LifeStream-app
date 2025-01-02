import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UseUserInfoUpdate } from '@/hooks/usePersonalInformation';
import Toast from 'react-native-toast-message';

interface DonorInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface UpdateProps {
  userid: string;
}

const UpdatePersonalInformation: React.FC<UpdateProps> = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DonorInfo>();
  const mutation = UseUserInfoUpdate();

  const onSubmit = (data: DonorInfo) => {
    mutation.mutate(data, {
      onSuccess: () => {
        Toast.show({
          type:'success',
          text1:'Success',
          text2:'Information updated successfully',
          text1Style:{fontSize:20},
          position:'top',
          visibilityTime:4000,

        });
        setTimeout(()=>{
          navigation.goBack();
        },2000)
        
      },
      onError: () => {
        Toast.show({
          type:'error',
          text1:'Error',
          text2:'Failed to update information',
          text1Style:{fontSize:20},
          position:'top',
          visibilityTime:4000,
        });
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Personal Information</Text>

      <Controller
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="fullName"
      />
      {errors.fullName && <Text style={styles.error}>{errors.fullName.message}</Text>}

      <Controller
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email address',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        rules={{
          required: 'Phone number is required',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Phone number must be 10 digits',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
        name="phoneNumber"
      />
      {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber.message}</Text>}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          {mutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Update</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Toast/>
    </View>
  );
};

export default UpdatePersonalInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#ef4444',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
