import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {InventoryItem, ItemList} from './InventoryItem';

const AddItem = props => {
  const [itemName, setName] = useState('');
  const [ExpirationDate, setExp] = useState('');
  const [ReminderDate, setRem] = useState('');
  const [Description, setDes] = useState('');
  const [Category, setCat] = useState('');
  var newItem = '';

  const resetTextInput = () => {
    setName('');
    setExp('');
    setRem('');
    setDes('');
    setCat('');
  }

  function isLeapYear(year) {
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return true;
    } else {
        return false;
    }
  }
  
  function checkReminderDate(ExpirationDate, ReminderDate){
    var expDate = ExpirationDate.split("/");
    var remDate = ReminderDate.split("/");
  
    var expMonth = parseInt(expDate[0]);
    var expDay = parseInt(expDate[0]);
    var expYear = parseInt(expDate[2]);
  
    var remMonth = parseInt(remDate[0]);
    var remYear = parseInt(remDate[2]);
    var remDay = parseInt(remDate[0]);
  
    if(remYear > expYear){
      alert("Cannot enter a reminder date after an expiration date");
      return false;
    }
    else if(remYear == expYear && remMonth > expMonth)
    {
      alert("Cannot enter a reminder date after an expiration date");
      return false;
    }
    else if(remYear == expYear && remMonth == expMonth && remDay > expDay)
    {
      alert("Cannot enter a reminder date after an expiration date");
      return false;
    }
    else  
      return true;
  }
  
  function dateValidation(ExpirationDate){
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    const monthsWith30Days = [4, 6, 9, 10];
  
    if(ExpirationDate.includes("/")){
      var expDate = ExpirationDate.split("/");
      if(expDate.length < 3 || expDate.length > 3){
        alert("Expiration Date does not follow required format: mm/dd/yyyy");
        return false;
      }
      //check format of mm/dd/yy
      var passedMonth = String(expDate[0]);
      var passedDay = String(expDate[1]);
      var passedYear = String(expDate[2]);
  
      if(passedMonth.length < 2 || passedMonth.length > 2){
        alert("Month does not follow propper formatting: mm/dd/yyyy");
        return false;
      }
      if(passedDay.length < 2 || passedDay.length > 2){
        alert("Day does not follow propper formatting: mm/dd/yyyy");
        return false;
      }
      if(passedYear.size < 4 || passedYear.size > 4){
        alert("Year does not follow propper formatting: mm/dd/yyyy");
        return false;
      }
      //after this we can confirm they are propper lengths
      //check if mm/dd/yy are ints
      if(isNaN(passedMonth) || isNaN(passedDay) || isNaN(passedYear)){
        alert("Entered date contains non-integer values");
        return false;
      }
      //check if the dates make sense
      passedMonth = parseInt(passedMonth);
      passedDay = parseInt(passedDay);
      passedYear = parseInt(passedYear);
      //console.log(passedMonth);
      var expDate = new Date(passedYear, passedMonth, passedDay);
      //year
      if(passedYear < year){
        alert("Cannot enter a year prior to the current year");
        return false;
      }
      if(passedYear > 2100){
        alert("Don't act like you'll live that long...");
        return false;
      }
      //month
      if(passedMonth > 12 || passedMonth < 1){
        alert("Month must be a number 1 - 12");
        return false;
      }
      if(passedYear == year && passedMonth < month){
        alert("Cannot enter a month prior to current month within the same year");
        return false;
      }
      //day
      if(passedYear == year && passedMonth == month && passedDay < day){
        alert("Cannot enter a day before the curent one in the same month and year");
        return false;
      }
      if(isLeapYear(passedYear) == false && passedMonth == 2 && passedDay > 28){
        alert("On a standard year February only has 28 days");
        return false;
      }
      if(isLeapYear(passedYear) && passedMonth == 2 && passedDay > 29){
        alert("On a leap year February only has 29 days");
        return false;
      }
      if(monthsWith30Days.includes(passedDay) && passedDay > 30){
        alert("The entered month only has 30 days.");
        return false;
      }
      if((!monthsWith30Days.includes(passedDay)) && passedMonth != 2 && passedDay > 31){
        alert("The enterd month only has 31 days");
        return false;
      }
    }
    return true;
  }
  
  function validateInput(itemName, ExpirationDate, ReminderDate, Description, Category) {
    var newItem = '';
    
    if(itemName == ''){
      alert("Item must Have a name")
      return false;
    }
    else if (Category == '') {
      alert("Assign the item a category");
      return false;
    }
    //Dates
    if(!ExpirationDate.includes("/")){
      alert("Expiration Date does not follow required format: mm/dd/yyyy");
      return false;
    }
    if(!ReminderDate.includes("/")){
      alert("Reminder Date does not follow required format: mm/dd/yyyy");
      return false;
    }
    if(dateValidation(ExpirationDate) && dateValidation(ReminderDate) && checkReminderDate(ExpirationDate, ReminderDate)){
      newItem = new InventoryItem(itemName, ExpirationDate, ReminderDate, Description, Category);
      ItemList(newItem);
      resetTextInput();
    }
  }

  return(
  
    <View style={styles.header}>
      <TextInput
        style = {styles.input}
        placeholder = "Enter Item Name"
        value={itemName}
        onChangeText={(val) => setName(val)}/>
        
      <TextInput
        style = {styles.input}
        placeholder = "Enter Item Description"
        value={Description}
        onChangeText={(val) => setDes(val)}/>

      <TextInput
        style = {styles.input}
        placeholder = "Enter Item Category"
        value={Category}
        onChangeText={(val) => setCat(val)}/>

      <TextInput
        style = {styles.input}
        placeholder = "Enter Expiration Date (mm/dd/yyyy)"
        value={ExpirationDate}
        onChangeText={(val) => setExp(val)}/>

      <TextInput
        style = {styles.input}
        placeholder = "Enter Reminder Date (mm/dd/yyyy)"
        value={ReminderDate}
        onChangeText={(val) => setRem(val)}/>

      <TouchableOpacity style={styles.btn} onPress={() => {validateInput(itemName, ExpirationDate, ReminderDate, Description, Category);}}>
        <Text style={styles.btnText}> <Icon name="plus" size={20}/>Add Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('Home')}>
      <Text style={styles.btnText}>Return Home</Text>
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
export default AddItem;