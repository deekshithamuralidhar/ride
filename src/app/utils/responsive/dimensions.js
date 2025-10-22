import { Dimensions } from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";

export const rw = (val) => responsiveWidth(val);
export const rh = (val) => responsiveHeight(val);
export const { width, height } = Dimensions.get("window");
