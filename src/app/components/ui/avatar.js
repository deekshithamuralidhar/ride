import { Dimensions, Text, View } from "react-native";
import { cn } from "../../utils/responsive/classMerger";
import { getInitials, stringToColor } from "../../utils/helperUtils/string";
import { color as colors } from "../../utils/styles/colors";
import { font_fam } from "../../utils/styles/fontFamily";
import { font_size } from "../../utils/styles/fontSize";
import { Image } from "expo-image";

export const Avatar = ({
  width,
  height,
  fontSize = font_size.fs_19,
  color = colors.white,
  fontFamily = font_fam.telex_reg,
  className,
  asset,
  string,
  ...props
}) => {
  console.log(typeof asset, "asset");
  return (
    <View
      style={{
        width: Dimensions.get("window").height * (width / 100),
        height: Dimensions.get("window").height * (height / 100),
        borderRadius: Dimensions.get("window").height / 2,
        backgroundColor: !asset && stringToColor(string),
        ...props,
      }}
      className={cn(className, "items-center justify-center uppercase")}
    >
      {typeof asset === "object" ? (
        asset
      ) : (
        <Image
          style={{ width: "100%", height: "100%", position: "absolute" }}
          contentFit="cover"
          source={{ uri: asset }}
        />
      )}
      {!asset && (
        <Text style={{ fontSize, color, fontFamily }}>
          {getInitials(string)}
        </Text>
      )}
    </View>
  );
};
