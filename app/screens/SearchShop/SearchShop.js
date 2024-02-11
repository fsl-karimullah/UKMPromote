import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {SelectList} from 'react-native-dropdown-select-list';
import axios from 'axios';
import {endpoint} from '../../api/endpoint';
import {useDispatch, useSelector} from 'react-redux';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import { showToast } from '../../resources/helper';

const SearchShop = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selected, setSelected] = useState('');
  const [showModal, setShowModal] = useState(false);


 

  
  return ( 
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products or services"
            placeholderTextColor="#A0A0A0"
          />
        </View>
        <Pressable onPress={() => setShowModal(true)}>
          <View style={styles.filterContainer}>
            <Text style={styles.filterText}>Location Name</Text>
          </View>
        </Pressable>
      </View>

      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        backdropOpacity={0.5}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Location</Text>
          <View style={styles.dropdownContainer}>
           <Text>test</Text>
              
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 10,
  },
  searchBarContainer: {
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  filterText: {
    marginRight: 5,
    color: '#333',
  },
  modal: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dropdownContainer: {
    width: widthPercentageToDP(80),
  },
});

export default SearchShop;
