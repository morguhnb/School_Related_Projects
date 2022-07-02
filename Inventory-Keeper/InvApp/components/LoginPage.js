import React, { useState , useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,} from 'react-native';
import { auth } from '../firebase/config';
import { getDataFromDB } from '../components/InventoryItem'

const LoginPage = props => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    
    useEffect(() => {
        getDataFromDB();
    })

    function handleSignUp() {
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
            })
            .catch(error => alert(error.message));
    }

    return(
    
    <View style={styles.header}>
        <TextInput
        style = {styles.input}
        placeholder = "Email"
        value = {email}
        onChangeText= {text => setEmail(text)}
        />
        <TextInput
        style = {styles.input}
        placeholder = "Password"
        value = {password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        />
      <TouchableOpacity onPress={(handleSignUp)}>
      <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Home')}>
      <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Home')}>
      <Text style={styles.buttonText}>Return Home</Text>
      </TouchableOpacity>

    </View>
    
  )
}

const styles = StyleSheet.create({
  input: {
      height: 60,
      padding: 8,
      fontSize: 16
      
  },
  button: {
    backgroundColor: '#c2bad8',
    padding: 10,
    margin: 5
  },
  buttonText: {
      color: "darkslateblue",
      fontSize: 20,
      textAlign: 'center'
  }
})
export default LoginPage;