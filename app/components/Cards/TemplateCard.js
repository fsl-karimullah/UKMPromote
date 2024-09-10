import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { InterBold, InterRegular } from '../../resources/fonts';

const TemplateCard = ({ template, onBuyPress, onPreviewPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: template.thumbnail }}
        style={styles.thumbnail}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{template.name}</Text>
        <Text numberOfLines={3} style={styles.description}>
          {template.description}
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buyButton} onPress={onBuyPress}>
            <Text style={styles.buttonText}>Beli</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.previewButton} onPress={onPreviewPress}>
            <Text style={styles.buttonText}>Preview</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TemplateCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  thumbnail: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily:InterBold,
    color:'black'
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontFamily:InterRegular
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buyButton: {
    backgroundColor: '#e53935',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  previewButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
