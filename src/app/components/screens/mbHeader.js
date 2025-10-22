import { Image } from "expo-image";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { rh, rw } from "../../utils/responsive/dimensions";
import { MBLogo } from "../../svgs/icons";
import { ms } from "react-native-size-matters";

export const MBHeader = () => {
  return (
    <View className="w-full  gap-2 " style={{ paddingTop: ms(12) }}>
      <MBLogo width={rw(34.5)} height={rh(3.2)} />
    </View>
  );
};
