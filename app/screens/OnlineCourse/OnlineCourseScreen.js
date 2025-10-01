import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  ActivityIndicator, 
  Dimensions, 
  TextInput, 
  TouchableOpacity 
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { endpoint } from '../../api/endpoint'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const screenWidth = Dimensions.get('window').width
const cardWidth = (screenWidth - 30) / 2
const cardHeight = 180 

const OnlineCourseScreen = () => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [userToken, setUserToken] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const getTokenAndFetch = async () => {
      try {
        const value = await AsyncStorage.getItem('@userToken')
        if (value) {
          setUserToken(value)
          await fetchCourses(value)
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error('Error getting user token:', error)
        setLoading(false)
      }
    }

    getTokenAndFetch()
  }, [])

  const fetchCourses = async (token) => {
    try {
      const response = await axios.get(endpoint.getCourses, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setCourses(response.data.data)
      setFilteredCourses(response.data.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (text) => {
    setSearchQuery(text)
    if (text.trim() === '') {
      setFilteredCourses(courses)
    } else {
      const filtered = courses.filter((course) =>
        course.title.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredCourses(filtered)
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailCourseScreen', { id: item.id })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.mentor} numberOfLines={1}>{item.mentor}</Text>
        {item.price === 0 ? (
          <Text style={styles.free}>Gratis</Text>
        ) : (
          <View style={styles.priceContainer}>
            {item.discount > 0 && (
              <Text style={styles.discount}>-{item.discount}%</Text>
            )}
            <Text style={styles.price}>Rp {item.price.toLocaleString()}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Cari kursus..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  )
}

export default OnlineCourseScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchBar: {
    backgroundColor: '#f2f2f2',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    fontSize: 14
  },
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4
  },
  thumbnail: {
    width: '100%',
    height: cardHeight,
    resizeMode: 'cover'
  },
  info: {
    padding: 8
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4
  },
  mentor: {
    fontSize: 11,
    color: '#555',
    marginBottom: 6
  },
  free: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 12
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  discount: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 6
  },
  price: {
    fontWeight: 'bold',
    fontSize: 12
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
