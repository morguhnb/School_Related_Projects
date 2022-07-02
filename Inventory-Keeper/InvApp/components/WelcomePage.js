import { View, Text, StyleSheet, TextInput, TouchableOpacity,} from 'react-native';
import React, { useEffect} from 'react';
import { getDataFromDB } from '../components/InventoryItem'

const WelcomePage = props => {

  useEffect(() => {
    getDataFromDB();
    })


    return(
    
    <View style={styles.header}>
      <Text style={styles.buttonText}>Welcome! </Text>


      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Home')}>
      <Text style={styles.buttonText}> Inventory</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('LearnMore')}>
      <Text style={styles.buttonText}>How To Use </Text>
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
    padding: 30,
    margin: 5
  },
  buttonText: {
      color: "darkslateblue",
      fontSize: 20,
      textAlign: 'center'
  }

})
export default WelcomePage;