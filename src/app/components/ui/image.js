import { Image as ImageMB } from "expo-image";
import { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const Image = ({ ...props }) => {
  const [loader, setloader] = useState(true);

  const onLoadEnd = () => {
    setloader(false);
  };
  return (
    <>
      {loader && (
        <View className="w-full h-full items-center justify-center absolute z-10 bg-[rgba(225,225,225,0.7)]">
          <ActivityIndicator animating size={40} />
        </View>
      )}
      <ImageMB onLoadEnd={onLoadEnd} {...props} />
    </>
  );
};
