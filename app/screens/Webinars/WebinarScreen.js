import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import { endpoint } from '../../api/endpoint';
import CardWebinar from '../../components/Cards/CardWebinar';
import { InterBold, InterRegular } from '../../resources/fonts';
import { useNavigation } from '@react-navigation/native';

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
    <CardWebinar webinar={item} onPress={() => handlePress(item)} />
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
    backgroundColor: '#f5f5f5',
  },
  screenTitle: {
    fontSize: 24,
    marginVertical: 16,
    color: '#333',
    fontFamily: InterBold,
    textAlign: 'center',
  },
  webinarList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: InterRegular,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontFamily: InterBold,
  },
});
