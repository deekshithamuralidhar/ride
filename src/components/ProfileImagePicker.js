import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ProfileImagePicker = ({ onImageSelected }) => {
  const [image, setImage] = useState(null);

  const pickImage = () => {
    // Note: This is a mock implementation for demonstration purposes
    // In a real app with expo-image-picker installed, this would open the image picker
    // For now, we'll simulate the functionality with a placeholder
    Alert.alert(
      'Image Picker',
      'In a production app with expo-image-picker installed, this would open your device\'s image library.\n\nRequirements:\n- JPG or PNG format\n- Max 5MB file size\n- 1:1 aspect ratio recommended',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Select Mock Image',
          onPress: () => {
            // Use a placeholder image for demo
            const mockImageUri = 'https://via.placeholder.com/150';
            setImage(mockImageUri);
            onImageSelected(mockImageUri);
          },
        },
      ]
    );
  };

  const removeImage = () => {
    setImage(null);
    onImageSelected(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profile Photo (Optional)</Text>
      <Text style={styles.hint}>JPG or PNG, max 5MB</Text>
      
      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
            <Text style={styles.removeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.placeholderContainer} onPress={pickImage}>
          <Text style={styles.placeholderIcon}>📷</Text>
          <Text style={styles.placeholderText}>Tap to select photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: 'relative',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholderContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  placeholderIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 12,
    color: '#666',
  },
});

export default ProfileImagePicker;
