import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { endpoint } from '../../api/endpoint';
import CardMentors from '../../components/Cards/CardMentors';
import { InterBold } from '../../resources/fonts';
import { useNavigation } from '@react-navigation/native';

const MentorScreen = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(endpoint.getMentors); 
        setMentors(response.data.data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const renderItem = ({ item }) => <CardMentors mentor={item} />;

  const handleSKPress = () => {
    navigation.navigate('TermsAndConditions');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={mentors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleSKPress}>
        <Text style={styles.buttonText}>Syarat & Ketentuan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MentorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  listContent: {
    paddingBottom: 80, 
    paddingHorizontal: 16,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -75 }],
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: InterBold,
    fontSize: 16,
  },
});
