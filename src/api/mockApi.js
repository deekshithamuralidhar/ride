import { generatePassword } from '../utils/password';

// Mock OTP code for testing
const MOCK_OTP = '123456';

// Simulated delay for API calls
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Send OTP to phone number
 * @param {string} phoneNumber - Phone number with country code
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const sendOTP = async (phoneNumber) => {
  await simulateDelay(1500);
  
  console.log(`[Mock API] Sending OTP to ${phoneNumber}`);
  console.log(`[Mock API] OTP Code: ${MOCK_OTP}`);
  
  return {
    success: true,
    message: `OTP sent to ${phoneNumber}`,
  };
};

/**
 * Verify OTP code
 * @param {string} phoneNumber - Phone number with country code
 * @param {string} otp - OTP code to verify
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const verifyOTP = async (phoneNumber, otp) => {
  await simulateDelay(1000);
  
  console.log(`[Mock API] Verifying OTP for ${phoneNumber}: ${otp}`);
  
  if (otp === MOCK_OTP) {
    console.log('[Mock API] OTP verified successfully');
    return {
      success: true,
      message: 'OTP verified successfully',
    };
  } else {
    console.log('[Mock API] Invalid OTP');
    return {
      success: false,
      message: 'Invalid OTP. Please try again.',
    };
  }
};

/**
 * Register a new rider
 * @param {Object} riderData - Rider registration data
 * @returns {Promise<{success: boolean, message: string, data?: Object}>}
 */
export const registerRider = async (riderData) => {
  await simulateDelay(2000);
  
  const { fullName, email, phone, countryCode, gender, profileImage } = riderData;
  
  // Generate password
  const password = generatePassword(8);
  
  // Create userId from phone (countryCode + phone)
  const userId = `${countryCode}${phone}`;
  
  console.log('[Mock API] Registering rider:');
  console.log(`  Full Name: ${fullName}`);
  console.log(`  Email: ${email}`);
  console.log(`  Phone: ${countryCode}${phone}`);
  console.log(`  Gender: ${gender || 'Not specified'}`);
  console.log(`  Profile Image: ${profileImage ? 'Provided' : 'Not provided'}`);
  console.log(`  Generated UserId: ${userId}`);
  console.log(`  Generated Password: ${password}`);
  console.log(`[Mock API] Sending credentials to email: ${email}`);
  console.log(`[Mock API] Sending credentials to phone: ${countryCode}${phone}`);
  
  return {
    success: true,
    message: 'Rider registered successfully. Credentials sent to your email and phone.',
    data: {
      userId,
      fullName,
      email,
      phone: `${countryCode}${phone}`,
      // Password would not typically be returned, but for demo purposes:
      generatedPassword: password,
    },
  };
};
