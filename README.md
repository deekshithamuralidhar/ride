# Ride - Rider Signup Feature

This repository contains a React Native application with a Rider Signup flow implementation.

## Features

### Rider Signup Flow

The Rider Signup feature includes:

1. **Sign Up Screen** - Complete registration form with:
   - Full Name (mandatory)
   - Email (mandatory, validated)
   - Phone Number with country code (mandatory, requires OTP verification)
   - Gender (optional)
   - Profile Photo (optional, JPG/PNG, max 5MB)

2. **OTP Verification Screen** - Verify phone number via OTP
   - Mock OTP code: `123456`
   - After verification, phone becomes non-editable

3. **System Features**:
   - UserId is generated from phone number (country code + 10-digit number)
   - System auto-generates an alphanumeric password
   - Mock API simulates sending credentials to email and phone
   - Profile photo validation: JPG/PNG only, max 5MB

## Project Structure

```
src/
├── screens/
│   ├── SignUpScreen.js      # Main signup form with validation
│   └── OTPScreen.js          # OTP verification screen
├── components/
│   └── ProfileImagePicker.js # Image picker with validation
├── api/
│   └── mockApi.js            # Mock backend for OTP and registration
└── utils/
    ├── validation.js         # Email and phone validators
    └── password.js           # Password generator utility
```

## Requirements

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app on physical device)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/deekshithamuralidhar/ride.git
cd ride
```

2. Install dependencies:
```bash
npm install
```

## Running the Demo

### Option 1: Demo Mode (Rider Signup Flow Only)

To run just the Rider Signup flow in demo mode:

1. Open `App.js` and set `DEMO_RIDER_SIGNUP = true`:
```javascript
const DEMO_RIDER_SIGNUP = true; // Change from false to true
```

2. Start the app:
```bash
npm start
```

3. Press `i` for iOS simulator or `a` for Android emulator

### Option 2: Full App Mode

To run the complete application with existing features:

1. Ensure `DEMO_RIDER_SIGNUP = false` in `App.js` (default)

2. Start the app:
```bash
npm start
```

## Testing the Signup Flow

1. **Fill in the form**:
   - Enter your full name
   - Enter a valid email address
   - Select country code and enter a 10-digit phone number
   - (Optional) Select gender
   - (Optional) Add profile photo

2. **Verify Phone Number**:
   - Click "Send OTP" button
   - You'll be redirected to OTP screen
   - Enter the test OTP: `123456`
   - Click "Verify OTP"
   - You'll be redirected back to signup with verified status

3. **Submit Registration**:
   - Click "Submit" button
   - View the success message with generated UserId and Password
   - Check console logs for simulated email/SMS sending

## Implementation Details

### Validations

- **Email**: Standard email format validation
- **Phone**: 10-digit number validation
- **Profile Photo**: JPG/PNG only, max 5MB
- **OTP**: 6-digit code (mock: 123456)

### Mock Backend Behavior

The `mockApi.js` simulates:
- OTP sending with 1.5s delay
- OTP verification with 1s delay (accepts only "123456")
- Rider registration with 2s delay
- Password generation (8-character alphanumeric)
- Logging credentials to console (simulating email/SMS)

### UserId Generation

UserId format: `{countryCode}{phoneNumber}`

Examples:
- `+1` + `5551234567` = `+15551234567`
- `+91` + `9876543210` = `+919876543210`

## Phase 2 Features (Not Implemented)

- Save frequent addresses functionality

## Technologies Used

- React Native
- Expo
- React Navigation
- expo-image-picker
- @react-native-picker/picker

## License

This project is part of the Ride application.