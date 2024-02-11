import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

const BottomSheet = ({ visible, onClose }) => {
  const screenHeight = Dimensions.get('window').height;
  const [overlayOpacity] = useState(new Animated.Value(0));

  const openSheet = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(onClose);
  };

  const handleOverlayPress = () => {
    if (visible) {
      closeSheet();
    }
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <Animated.View
          style={[
            styles.overlay,
            {
              backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
            },
          ]}
        />
      </TouchableWithoutFeedback>

      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle}>
          <View style={styles.handleBar} />
        </View>
        <View style={styles.sheetContent}>
          <Text>Modal Content</Text>
          {/* Add your content here */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  sheetHandle: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
  sheetContent: {
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
});

export default BottomSheet;
