import {StyleSheet, Text, View,FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {endpoint} from '../../api/endpoint';
import Axios from 'axios';
import EducationalCard from '../../components/Cards/EducationalCards';

const ListAllNews = ({navigation}) => {
  const [NewsData, setNewsData] = useState([]);
  const [userToken, setUserToken] = useState();
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    getTokenData();
  }, []);
  useEffect(() => {
    if (userToken) {
      fetchNewsData();
    }
  }, [userToken]);
  const getTokenData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userToken');
      if (value !== null) {
        setUserToken(value);
        // console.log('Home Token', value);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const fetchNewsData = async () => {
    setisLoading(true);
    try {
      const response = await Axios.get(endpoint.getNews, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      //   console.log('NEWSSS', response.data.data);
      setNewsData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  const renderItem = ({item}) => (
    <EducationalCard
      title={item.title}
      description={item.description}
      imageSource={item.thumbnail}
      onPress={() => navigation.navigate('NewsDetails', {id: item.id})}
    />
  ); 
  return (
    <View style={styles.container}>
      <FlatList
        data={NewsData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListAllNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
