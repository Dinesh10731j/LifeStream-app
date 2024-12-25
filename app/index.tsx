import { StyleSheet, Text, View, TextInput, TouchableOpacity,ActivityIndicator,StatusBar } from 'react-native';
import React from 'react';
import BgBubble from '@/components/BgBubble';
import { useForm, Controller } from 'react-hook-form';
import { LoginType } from '@/Types';
import { useRouter } from 'expo-router';
import { UserUserLogin } from '@/hooks/useLogin';
import Toast from 'react-native-toast-message';

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginType>();
  const router = useRouter();
  const loginUser = UserUserLogin();


  

  const OnLogin = (data: LoginType) => {
    loginUser.mutate(data);

    
  };

  return (
    <View style={styles.container}>
        <StatusBar hidden={true}/>
      <BgBubble />
      <View style={styles.loginBox}>
        <Text style={styles.title}>Welcome Back</Text>

        {/* Email Input */}
        <Controller
          control={control}
          rules={{
            required: 'E-mail is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ccc"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && <Text style={styles.errorColor}>{errors.email.message}</Text>}

        {/* Password Input */}
        <Controller
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && <Text style={styles.errorColor}>{errors.password.message}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(OnLogin)}
        >
       {loginUser.isPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Toast/>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loginBox: {
    width: '85%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#ef4444',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorColor: {
    color: 'red',
    marginBottom: 10,
  },
});
