// CustomSearchBar.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet,Text } from 'react-native';

const CustomSearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Pass the search text to the parent component or perform any search-related actions
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>Search</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 5,
    margin: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  searchButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
  },
  buttonTextContainer: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomSearchBar;
