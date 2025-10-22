import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
import RouteHandler from "./src/app/router";
import { useFonts } from "expo-font";
import { font_fam } from "./src/app/utils/styles/fontFamily";
import { PaperProvider } from "react-native-paper";

export default function App() {
  const [fontsLoaded] = useFonts({
    [font_fam.as_variable]: require("./assets/fonts/Alegreya/Alegreya-VariableFont_wght.ttf"),
    [font_fam.as_bold]: require("./assets/fonts/Alegreya/AlegreyaSansSC-Bold.ttf"),
    [font_fam.telex_reg]: require("./assets/fonts/Telex/Telex-Regular.ttf"),
    [font_fam.anuphan_med]: require("./assets/fonts/Anuphan/Anuphan-VariableFont_wght.ttf"),
    [font_fam.gantari_semibold]: require("./assets/fonts/Gantari/Gantari-SemiBold.ttf"),
    [font_fam.gantari_variable]: require("./assets/fonts/Gantari/Gantari-VariableFont_wght.ttf"),
    // 'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
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
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
