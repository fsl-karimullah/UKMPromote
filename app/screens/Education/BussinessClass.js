import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import EducationClassCards from '../../components/Cards/EducationClassCards';
import { endpoint } from '../../api/endpoint';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BusinessClass = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    const getTokenData = async () => {
      try {
        const value = await AsyncStorage.getItem('@userToken');
        if (value !== null) {
          setUserToken(value);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false); 
      }
    };

    getTokenData();
  }, []);

  useEffect(() => {
    if (userToken) {
      fetchData();
    }
  }, [userToken]);

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint.getEducation, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <EducationClassCards
      title={item.title}
      desc={item.description}
      imageSource={{ uri: item.thumbnail }}
      isFree={item.free ? 'Gratis' : 'Premium'}
      onPress={() => navigation.navigate('BussinessDetailScreen',{id:item.id})}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BusinessClass;
