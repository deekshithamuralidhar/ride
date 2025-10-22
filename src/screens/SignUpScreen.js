import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ProfileImagePicker from '../components/ProfileImagePicker';
import { validateEmail, validatePhone } from '../utils/validation';
import { sendOTP, registerRider } from '../api/mockApi';

const SignUpScreen = ({ route, navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle OTP verification callback
  useEffect(() => {
    if (route.params?.phoneVerified) {
      setPhoneVerified(true);
      setPhoneNumber(route.params.phoneNumber);
      setCountryCode(route.params.countryCode);
    }
  }, [route.params]);

  const handleSendOTP = async () => {
    // Validate phone number
    if (!validatePhone(phoneNumber)) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    try {
      const fullPhone = `${countryCode}${phoneNumber}`;
      const result = await sendOTP(fullPhone);
      
      if (result.success) {
        Alert.alert('OTP Sent', result.message, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('OTP', { phoneNumber, countryCode }),
          },
        ]);
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validate all fields
    if (!fullName.trim()) {
      Alert.alert('Invalid Input', 'Please enter your full name.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!phoneVerified) {
      Alert.alert('Phone Not Verified', 'Please verify your phone number before submitting.');
      return;
    }

    setLoading(true);
    try {
      const riderData = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phoneNumber,
        countryCode,
        gender: gender || null,
        profileImage,
      };

      const result = await registerRider(riderData);
      
      if (result.success) {
        Alert.alert(
          'Registration Successful',
          `${result.message}\n\nYour UserId: ${result.data.userId}\nPassword: ${result.data.generatedPassword}\n\nCredentials have been sent to your email and phone.`,
          [
            {
              text: 'OK',
              onPress: () => {
                // In a real app, navigate to login or home screen
                console.log('Registration complete:', result.data);
              },
            },
          ]
        );
      } else {
        Alert.alert('Registration Failed', result.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Sign Up as Rider</Text>

          <ProfileImagePicker onImageSelected={setProfileImage} />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number *</Text>
            <View style={styles.phoneContainer}>
              <View style={styles.countryCodeContainer}>
                <TouchableOpacity
                  style={styles.countryCodeButton}
                  onPress={() => {
                    if (!phoneVerified && !loading) {
                      Alert.alert(
                        'Select Country Code',
                        '',
                        [
                          { text: '+1 (US)', onPress: () => setCountryCode('+1') },
                          { text: '+44 (UK)', onPress: () => setCountryCode('+44') },
                          { text: '+91 (India)', onPress: () => setCountryCode('+91') },
                          { text: 'Cancel', style: 'cancel' },
                        ]
                      );
                    }
                  }}
                  disabled={phoneVerified || loading}
                >
                  <Text style={styles.countryCodeText}>{countryCode}</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={[styles.phoneInput, phoneVerified && styles.inputDisabled]}
                placeholder="10-digit phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
                editable={!phoneVerified && !loading}
              />
            </View>
            {phoneVerified ? (
              <Text style={styles.verifiedText}>✓ Phone verified</Text>
            ) : (
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleSendOTP}
                disabled={loading}
              >
                <Text style={styles.verifyButtonText}>Send OTP</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender (Optional)</Text>
            <TouchableOpacity
              style={styles.genderButton}
              onPress={() => {
                if (!loading) {
                  Alert.alert(
                    'Select Gender',
                    '',
                    [
                      { text: 'Male', onPress: () => setGender('male') },
                      { text: 'Female', onPress: () => setGender('female') },
                      { text: 'Other', onPress: () => setGender('other') },
                      { text: 'Cancel', style: 'cancel' },
                    ]
                  );
                }
              }}
              disabled={loading}
            >
              <Text style={styles.genderButtonText}>
                {gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : 'Select Gender'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.note}>
            * Required fields
          </Text>
          <Text style={styles.note}>
            Note: Save frequent addresses feature is Phase 2 (not implemented)
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputDisabled: {
    backgroundColor: '#e9e9e9',
    color: '#666',
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  countryCodeContainer: {
    width: 90,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  countryCodeButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  verifyButton: {
    marginTop: 8,
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  verifiedText: {
    marginTop: 8,
    color: '#28a745',
    fontSize: 14,
    fontWeight: '600',
  },
  genderButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  genderButtonText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default SignUpScreen;
