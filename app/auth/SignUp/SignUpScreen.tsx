import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useUserAPIState } from "@/store/UserAPIState";

const SignUpScreen = () => {
  const { signUpNewUser } = useUserAPIState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    const newUser = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      phonenumber: phonenumber,
      cancelAlarmCode: 1234,
      customDangerMessage: "I'm in danger!",
      selectedContacts: [],
    };
    await signUpNewUser(newUser, setErrorMessage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register new user</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstname}
        onChangeText={setFirstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastname}
        onChangeText={setLastname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phonenumber}
        onChangeText={setPhonenumber}
      />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttons} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text>{errorMessage}</Text>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingVertical: 20,
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
});

export default SignUpScreen;
