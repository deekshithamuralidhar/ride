import { Text, View } from "react-native";
import { rh, rw } from "../../../utils/responsive/dimensions";
import SVGComponent, { MBLogo } from "../../../svgs/icons";
import { ms } from "react-native-size-matters";
import { font_size } from "../../../utils/styles/fontSize";
import { Button } from "../../../components/ui/button";
import { color } from "../../../utils/styles/colors";
import { Image } from "../../../components/ui/image";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTE_NAMES } from "../../../constants";
import { font_fam } from "../../../utils/styles/fontFamily";

export default function GetStarted({ navigation }) {
  const handleRoute = (route) => navigation.navigate(route);

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ width: rw(100) }}
      className="flex-1 items-center justify-end"
    >
      <Image
        source={require("../../../../../assets/images/getStarted.jpg")}
        style={{ width: "100%", top: 0, height: 638, position: "absolute" }}
        contentFit="cover"
      />

      <View
        style={{
          height: rh(38),
          paddingVertical: ms(40),
          paddingHorizontal: ms(20),
        }}
        className="w-full bg-white items-center rounded-t-[50px] gap-14"
      >
        <MBLogo />
        <Text
          className="text-center w-[88%] "
          style={{ fontSize: font_size.fs_18, fontFamily: font_fam.as_bold }}
        >
          Join MagicBees and start your journey today — as a driver or rider.
        </Text>
        <View className="flex w-full flex-row gap-2">
          <Button
            title="Register as Rider"
            buttonColor={color.secondary}
            mode="contained"
            height={rh(5.5)}
            flex={1}
            fontFamily="telex-reg"
            borderRadius={14}
            fontSize={font_size.fs_14}
          />

          <Button
            onPress={() => handleRoute(ROUTE_NAMES.driverRegister)}
            title="Register as Driver"
            height={rh(5.5)}
            mode="contained"
            flex={1}
            fontFamily="telex-reg"
            borderRadius={14}
            fontSize={font_size.fs_14}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
