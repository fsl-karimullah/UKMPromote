import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Linking, Dimensions } from 'react-native';
import axios from 'axios';
import TemplateCard from '../../components/Cards/TemplateCard';
import { endpoint } from '../../api/endpoint';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 10;
const CARD_WIDTH = (width - 20 * 2 - CARD_MARGIN) / 2; 

const TemplateWebsiteScreen = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState({});
  const numColumns = 2;

  const fetchTemplates = async () => {
    try {
      const response = await axios.get(endpoint.getTemplates);
      setTemplates(response.data.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleBuyPress = (templateName) => {
    const phoneNumber = '+6285281252199';
    const message = `Hello, I am interested in buying the template: ${templateName}`;
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    Linking.openURL(waUrl).catch((err) => {
      console.error('Failed to open WhatsApp:', err);
    });
  };

  const handlePreviewPress = (templateUrl) => {
    Linking.openURL(templateUrl).catch((err) => {
      console.error('Failed to open preview URL:', err);
    });
  };

  const renderItem = ({ item }) => {
    const isItemLoading = loadingItems[item.id] || false;

    return (
      <View style={styles.itemContainer}>
        {isItemLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <TemplateCard
            template={item}
            onBuyPress={() => handleBuyPress(item.name)}
            onPreviewPress={() => handlePreviewPress(item.url_preview)}
          />
        )}
      </View>
    );
  };

  const handleEndReached = () => {
    setLoading(true);
    fetchTemplates();
  };

  return (
    <FlatList
      data={templates}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default TemplateWebsiteScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: CARD_WIDTH,
    marginBottom: 20,
  },
});
