import { useState } from "react";
import { Button as ButtonMB } from "react-native-paper";
import { color as colors } from "../../utils/styles/colors";
import { Text } from "react-native";
import { font_fam } from "../../utils/styles/fontFamily";
import { ms } from "react-native-size-matters";
import { rh } from "../../utils/responsive/dimensions";

export const Button = ({
  title,
  buttonColor = colors.primary,
  onPress,
  loading,
  height = rh(5.5),
  disabled,
  color = colors.white,
  borderRadius = ms(14),
  fontFamily = font_fam.telex_reg,
  ...props
}) => {
  const [loader, setLoader] = useState(false);
  const onPressHandler = async () => {
    loading && setLoader(true);
    onPress && (await onPress());
    setLoader(false);
  };

  return (
    <ButtonMB
      {...props}
      buttonColor={buttonColor}
      loading={loader}
      style={{
        ...props,
        height,
        borderRadius,
        justifyContent: "center",
      }}
      disabled={disabled || loader}
      onPress={onPressHandler}
    >
      <Text style={{ ...props,color, fontFamily,width:'100%' }}>{title}</Text>
    </ButtonMB>
  );
};
