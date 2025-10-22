import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import "./global.css";
import RouteHandler from "./src/app/router";
import { useFonts } from "expo-font";
import { font_fam } from "./src/app/utils/styles/fontFamily";
import { PaperProvider } from "react-native-paper";

// Import new Rider Signup screens
import SignUpScreen from './src/screens/SignUpScreen';
import OTPScreen from './src/screens/OTPScreen';

const Stack = createNativeStackNavigator();

// Demo mode flag - set to true to show Rider Signup flow
const DEMO_RIDER_SIGNUP = false;

function RiderSignupNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options={{ title: 'Sign Up as Rider' }}
        />
        <Stack.Screen 
          name="OTP" 
          component={OTPScreen}
          options={{ title: 'Verify OTP' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    [font_fam.as_variable]: require("./assets/fonts/Alegreya/Alegreya-VariableFont_wght.ttf"),
    [font_fam.as_bold]: require("./assets/fonts/Alegreya/AlegreyaSansSC-Bold.ttf"),
    [font_fam.telex_reg]: require("./assets/fonts/Telex/Telex-Regular.ttf"),
    [font_fam.anuphan_med]: require("./assets/fonts/Anuphan/Anuphan-VariableFont_wght.ttf"),
    [font_fam.gantari_semibold]: require("./assets/fonts/Gantari/Gantari-SemiBold.ttf"),
    [font_fam.gantari_variable]: require("./assets/fonts/Gantari/Gantari-VariableFont_wght.ttf"),
  });

  // Show Rider Signup flow in demo mode
  if (DEMO_RIDER_SIGNUP) {
    return (
      <SafeAreaProvider>
        <StatusBar translucent />
        <PaperProvider>
          <RiderSignupNavigator />
        </PaperProvider>
      </SafeAreaProvider>
    );
  }

  // Default app flow
  return (
    <SafeAreaProvider>
      <StatusBar translucent />
      <PaperProvider>
        <RouteHandler />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
