import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import axios from 'axios';
import { endpoint } from '../../api/endpoint';
import CardWebinar from '../../components/Cards/CardWebinar';
import { InterBold, InterRegular } from '../../resources/fonts';
import { useNavigation } from '@react-navigation/native';

const NUM_COLUMNS = 2; 
const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - 16 * 2 - CARD_MARGIN) / NUM_COLUMNS; 

const WebinarScreen = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchWebinars = async () => {
    try {
      const response = await axios.get(endpoint.getWebinars);
      setWebinars(response.data.data);
    } catch (err) {
      setError('Failed to load webinars');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebinars();
  }, []);

  const handlePress = (webinar) => {
    navigation.navigate('WebinarDetailScreen', { id: webinar.id });
  };

  const renderItem = ({ item }) => (
    <CardWebinar webinar={item} onPress={() => handlePress(item)} width={CARD_WIDTH} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Upcoming Webinars & Events</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#e53935" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={webinars}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={NUM_COLUMNS}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.webinarList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No webinars available</Text>
          }
        />
      )}
    </View>
  );
};

export default WebinarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  screenTitle: {
    fontSize: 22,
    marginVertical: 16,
    color: '#333',
    fontFamily: InterBold,
    textAlign: 'center',
  },
  webinarList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: InterRegular,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontFamily: InterBold,
  },
});
