import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,} from 'react-native';
import {editItem} from './InventoryItem';



let Item;


//export default class ItemDetails extends React.Component {        
const ItemDetails = props => {

    const [newName, setName] = useState('');
    const [newExpiration, setExp] = useState('');
    const [newReminder, setRem] = useState('');
    const [newDescription, setDes] = useState('');
    const [newCategory, setCat] = useState('');


        return (
            <View style={styles.header}>
                <TextInput
                style = {styles.input}
                placeholder = {Item.Name}
                value={newName}
                onChangeText={(val) => setName(val)}/>

                <TextInput
                style = {styles.input}
                placeholder = {Item.Description}
                value={newDescription}
                onChangeText={(val) => setDes(val)}/>

                <TextInput
                style = {styles.input}
                placeholder = {Item.Category}
                value={newCategory}
                onChangeText={(val) => setCat(val)}/>

                <TextInput
                style = {styles.input}
                placeholder = {Item.ExpirationDate}
                value={newExpiration}
                onChangeText={(val) => setExp(val)}/>

                <TextInput
                style = {styles.input}
                placeholder = {Item.ReminderDate}
                value={newReminder}
                onChangeText={(val) => setRem(val)}/>
                
                <TouchableOpacity style={styles.btn} onPress={() => {editItem(Item, newName, newExpiration, newReminder, newDescription, newCategory);}}>
                    <Text style={styles.btnText}>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('Home')}>
                    <Text style={styles.btnText}>Return Home</Text>
                </TouchableOpacity>
            </View>

        )
    }

export function setItem(obj){
    Item = obj;
}

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        fontSize: 16
    },
    btn: {
      backgroundColor: '#c2bad8',
      padding: 10,
      margin: 5
    },
    btnText: {
        color: "darkslateblue",
        fontSize: 20,
        textAlign: 'center'
    }
  })

export default ItemDetails;