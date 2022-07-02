import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { getItemList, getItem, deleteDataFromDB } from './InventoryItem';
import { setItem } from './ItemDetails';

let del = {};

const ListItem = props => {
  const [allItems, setAllItems] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setAllItems(getItemList());
    setItemList(getItemList());
  }, []);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredItems = allItems.filter(item => item.Name.toLowerCase().includes(formattedQuery));
    setItemList(filteredItems);
    setQuery(text);
  };

  const SearchBar = () => {

    return(
      <View
          style={{
            backgroundColor: '#ffffff',
            padding: 10,
            marginVertical: 10,
            borderRadius: 20
          }}
        >
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            value={query}
            onChangeText={queryText => handleSearch(queryText)}
            placeholder="Search"
            style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
          />
        </View>
    );
  }

  const [update, setUpdate] = useState(false);

  useEffect(() => setUpdate(false));

  const onRemove = (id) => {
    setItemList(itemList.filter(item => item.id !== id));
    deleteDataFromDB(id);
    setUpdate(true);
  };

  return(
    <View style={styles.Header}>
      <FlatList
        ListHeaderComponent={SearchBar}
        numColumns={1}
        keyExtractor = {(item) => item.id}
        data = {itemList}
        renderItem = {({item}) => (
          <>
          <TouchableOpacity style={styles.btn} 
            onPress={() => {let myItem = getItem(item.id); setItem(item); props.navigation.navigate('ItemDetails');}}
            onLongPress={() => onRemove(item.id)}
            >
            <Text style = {styles.btnText}>{item.Name}</Text>
          </TouchableOpacity>
          </>
        )}
      />
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

export default ListItem;