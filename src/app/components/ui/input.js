import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { font_fam } from "../../utils/styles/fontFamily";
import { font_size } from "../../utils/styles/fontSize";
import { color } from "../../utils/styles/colors";
import { memo } from "react";
import { Entypo } from "@expo/vector-icons";
import { Dropdown } from "react-native-paper-dropdown";

export const InputLabeled = ({InputLabel, placeholder, dropdown, label, ...props }) => {
  return (
    <View className="w-full gap-2 py-1">
      <Text
        className=" text-text_fade"
        style={{
          fontSize: font_size.fs_16,
          fontFamily: font_fam.anuphan_med,
        }}
      >
        {InputLabel || placeholder}
      </Text>
      {dropdown ? (
        <Dropdown
          {...props}
          placeholder={placeholder}
          label={InputLabel || placeholder}
          CustomDropdownInput={() => (
            <Input placeholder={placeholder} {...props} />
          )}
        />
      ) : (
        <Input placeholder={placeholder} {...props} />
      )}
    </View>
  );
};

export const Input = memo(({ placeholder, ...props }) => {
  return (
    <TextInput
      {...props}
      mode="outlined"
      // ensure the typed text uses the custom font
      contentStyle={{ fontFamily: font_fam.gantari_semibold, borderRadius: 12 }}
      // some platforms use the root style for placeholder; include here as well
      //   style={{flex:1, fontFamily: font_fam.gantari_semibold }}
      // set the Paper theme fonts so label/placeholder/floating label inherit the font
      theme={{
        fonts: {
          regular: {
            fontFamily: font_fam.gantari_semibold,
            fontSize: font_size.fs_16,
          },
          medium: {
            fontFamily: font_fam.gantari_semibold,
            fontSize: font_size.fs_16,
          },
        },
      }}
      activeOutlineColor="transparent"
      outlineStyle={{
        borderRadius: 12,
        borderWidth: 0.5,
        backgroundColor: color.white,
        borderColor: "#EFF1F3",
      }}
      cursorColor={color.black}
      placeholder={placeholder}
      // optional: change placeholder color if needed
      placeholderTextColor={color.black}
    />
  );
});
