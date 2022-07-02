import React, { Component} from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class LearnMore extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center'}}>
                <Text style={styles.title}>About the app:</Text>
                <Text style={styles.text}>        This app is an inventory tracker an inventory tracker and reminder all in one.
                Add your pantry items, or other items, an expiration if you wish, and a date to be reminded,
                and the app will notify you when it's time to restock on an item.
                {"\n"}        Your user login enables you to keep track of your items from multiple devices, with no restrictions
                for what can be tracked, making it useful for home and commercial uses.
                </Text>
                
                <Text style = {styles.title}>How to use:</Text>
                <Text style = {styles.text}>        After opening application, you can review these instructions of how to use the application. After finding yourself at the home screen, you can add
                 items to your inventory list by selecting, "Add Item." Each Item Consists of a name, a reminder date
                 and an Expiration date(If one applies). You can view your Inventory List at "Item List." Each Item can be
                 clicked to navigate to its details page, where it can be edited (Edit feature in progress).
                 {"\n"}    At any point you can return to the home page by selecting any of the "Return to home" buttons at the bottom of a page
                </Text>

                <Text style = {styles.title}>Future Updates:</Text>
                <Text style = {styles.text}>        Not all features are implimented yet. Some of these include Item editing
                and reminder notifications, and complete database functionality (This includes logn term item storage and user login). These were some of our goals for Sprint 3, 
                in addition to much needed UI styling, and a little bit of cleanup. However, these things are all in progress and will be completed in due time. Thank you for using our inventory keeper app!
                {"\n\n"}Team:{"\n"}Bryce Townsend{"\n"}Benjamin Pogue{"\n"}Deja Barclay{"\n"}Morguhn Burke</Text>
                
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('WelcomePage')}>
                <Text style={styles.text}>Return to Welcome Page</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'left'
    },
    text: {
        fontSize: 15,
        margin: 20,
        textAlign: 'left'
    },
    button: {
        backgroundColor: '#c2bad8',
        padding: 30,
        margin: 5
      },
})