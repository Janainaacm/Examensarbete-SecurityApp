import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useUserAPIState } from '@/store/UserAPIState';  // Adjust import path if needed
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/Types';
import { StackNavigationProp } from '@react-navigation/stack';

const SignInScreen = () => {
  const { signInUser } = useUserAPIState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSignIn = async () => {
    await signInUser(email, password, navigation, setErrorMessage);
  };

  const handleRegister = () => {
    navigation.navigate('SignUp');  
  }; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttons} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      
        <Text style={styles.dashedLine}>─────── Are you a new user? ───────</Text>
      
        <TouchableOpacity style={styles.buttons} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register Now</Text>
         </TouchableOpacity>
    </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: -30,
      marginTop: 150,
    },
    inputContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 15,
      padding: 10,
      width: '100%',
    },
    errorText: {
        color: 'red', 
        fontSize: 14,
        marginTop: 10, 
        textAlign: 'center',
        marginBottom: 20,
      },

    buttonContainer: {
      flex: 1,
      alignItems: 'center',
      marginTop: -100,
    },
    buttons: {
      backgroundColor: '#ff9fb2aa',
      padding: 13,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ffa3a8',
      width: '70%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold', 
      fontSize: 16,
    },
    dashedLine: {
      fontSize: 15,
      letterSpacing: 0,
      color: '#888',
      paddingVertical: 30,
    },
  });

export default SignInScreen;
