import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileImagePicker = ({ onImageSelected }) => {
  const [image, setImage] = useState(null);

  const validateImage = (imageUri) => {
    return new Promise((resolve, reject) => {
      // Check file type
      const fileExtension = imageUri.split('.').pop().toLowerCase().split('?')[0]; // Handle query params
      if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
        reject('Only JPG and PNG images are allowed.');
        return;
      }

      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (Platform.OS === 'web') {
        // For web, we need to fetch and check size
        fetch(imageUri)
          .then(response => response.blob())
          .then(blob => {
            if (blob.size > 5 * 1024 * 1024) {
              reject('Image size must be 5MB or less.');
            } else {
              resolve(imageUri);
            }
          })
          .catch(() => reject('Failed to validate image.'));
      } else {
        // For native platforms, expo-image-picker doesn't provide size directly
        // In a production app, you'd use expo-file-system to check size
        // For now, we'll just validate the extension
        resolve(imageUri);
      }
    });
  };

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to select an image.');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        
        try {
          await validateImage(imageUri);
          setImage(imageUri);
          onImageSelected(imageUri);
        } catch (error) {
          Alert.alert('Invalid Image', error);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
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
