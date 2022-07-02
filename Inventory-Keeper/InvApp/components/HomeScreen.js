import { View, Text, StyleSheet, TextInput, TouchableOpacity,} from 'react-native';

const HomeScreen = props => {
    return(
    
    <View style={styles.header}>
      <Text style={styles.buttonText}>Inventory Keeper</Text>



      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('AddItem')}>
      <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('ListItem')}>
      <Text style={styles.buttonText}>Item List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('WelcomePage')}>
      <Text style={styles.buttonText}> Go back </Text>
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
export default HomeScreen;