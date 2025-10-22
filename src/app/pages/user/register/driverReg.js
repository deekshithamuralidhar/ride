import { LinearGradient } from "expo-linear-gradient";
import { color } from "../../../utils/styles/colors";
import { height, rh, rw } from "../../../utils/responsive/dimensions";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Pressable,
} from "react-native";
import { MBHeader } from "../../../components/screens/mbHeader";
import { font_fam } from "../../../utils/styles/fontFamily";
import { font_size } from "../../../utils/styles/fontSize";
import { ms } from "react-native-size-matters";
import { Avatar } from "../../../components/ui/avatar";
import { BackIcon, LicenseIcon, PersonIcon } from "../../../svgs/icons";
import { TextInput } from "react-native-paper";
import React, { useEffect, useMemo, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input, InputLabeled } from "../../../components/ui/input";
import { Entypo } from "@expo/vector-icons";
import { Button } from "../../../components/ui/button";
import { CountryPicker } from "react-native-country-codes-picker";
import { authStore } from "../../../zustand/authStore";
import { Dropdown } from "react-native-paper-dropdown";

export default function DriverRegister() {
  const { driverRegStep, setDriverRegStep } = authStore((state) => state);

  const handleStepperNext = () => {
    setDriverRegStep(driverRegStep + 1);
  };

  const handleStepperBack = () => {
    setDriverRegStep(driverRegStep - 1);
  };
  return (
   <></>
  );
}

const DriverProfileSteps = () => {
  const { driverRegStep } = authStore((state) => state);
  switch (driverRegStep) {
    case 0:
      return <DriverBio />;
    case 1:
      return <DriverAddress />;
    case 2:
      return <DriverDocuments />;
  }
};

const DriverBio = () => {
  const MULTI_SELECT_OPTIONS = [
    { label: "White", value: "white" },
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Orange", value: "orange" },
  ];
  const monthNamesShort = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());
  const [pickerKey, setPickerKey] = useState(0); // force re-render for android
  const [showContryPicker, setShowContryPicker] = useState(false);
  useEffect(() => {
    // initialize pickerDate from fields if valid
    const parsed = parseFieldsToDate(month, day, year);
    if (parsed) setPickerDate(parsed);
  }, []);

  function monthIndexFromInput(input) {
    if (!input) return -1;
    const normalized = input.trim().toLowerCase();
    // accept short or full names
    for (let i = 0; i < monthNamesShort.length; i++) {
      if (monthNamesShort[i].toLowerCase() === normalized) return i;
    }
    const full = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    for (let i = 0; i < full.length; i++) if (full[i] === normalized) return i;
    return -1;
  }

  function daysInMonth(idx, yr) {
    if (idx < 0) return 31;
    const y = Number(yr) || new Date().getFullYear();
    return new Date(y, idx + 1, 0).getDate();
  }

  function clampDayInput(val, mIdx, yr) {
    let n = Number(val.replace(/[^0-9]/g, "")) || 0;
    const max = daysInMonth(mIdx, yr);
    if (n < 1) n = 1;
    if (n > max) n = max;
    return String(n);
  }

  function parseFieldsToDate(m, d, y) {
    const mi = monthIndexFromInput(m);
    const dy = Number(d);
    const yr = Number(y);
    if (mi < 0 || !dy || !yr) return null;
    const max = daysInMonth(mi, yr);
    if (dy < 1 || dy > max) return null;
    return new Date(yr, mi, dy);
  }

  function onPickerChange(event, selected) {
    // selected is Date | undefined
    if (Platform.OS === "android") setShowPicker(false);
    if (event?.type === "dismissed") return;
    const date = selected || pickerDate;
    setPickerDate(date);
    setMonth(monthNamesShort[date.getMonth()]);
    setDay(String(date.getDate()));
    setYear(String(date.getFullYear()));
  }

  function openPicker() {
    const parsed = parseFieldsToDate(month, day, year);
    if (parsed) setPickerDate(parsed);
    setPickerKey((k) => k + 1);
    setShowPicker(true);
  }

  function onMonthBlur() {
    const idx = monthIndexFromInput(month);
    if (idx >= 0) {
      setMonth(monthNamesShort[idx]);
      // adjust day if exceeds
      setDay((prev) => clampDayInput(prev, idx, year));
    } else {
      // invalid -> clear or fallback
      setMonth("");
    }
  }

  function onDayBlur() {
    const idx = monthIndexFromInput(month);
    setDay((prev) => clampDayInput(prev, idx, year));
  }

  function onYearBlur() {
    // clamp year to reasonable range
    let y = Number(year.replace(/[^0-9]/g, "")) || new Date().getFullYear();
    if (y < 1900) y = 1900;
    if (y > 2100) y = 2100;
    setYear(String(y));
    // adjust day for leap years
    const idx = monthIndexFromInput(month);
    setDay((prev) => clampDayInput(prev, idx, y));
  }

  const onSelect = (country) => {
    console.log(country, "checkCountry");
  };
  return (
    <>
      <View
        className="w-full items-center gap-12"
        style={{ paddingVertical: ms(20) }}
      >
        <Avatar
          asset={<PersonIcon />}
          string={"Rahul"}
          width={10}
          height={10}
          fontSize={font_size.fs_30}
        />
      </View>

      <View className="w-full gap-4">
        <InputLabeled placeholder={"First Name"} />
        {/* <Dropdown
          label="Gender"
          value="hii"
          placeholder="Select Gender"
          options={MULTI_SELECT_OPTIONS}
          CustomDropdownInput={()=><Input placeholder='Picker' value='hello'/>}
        //   value={gender}
        //   onSelect={setGender}
        /> */}
        <View className="w-full flex-row ">
          <View className="w-full">
            <Text
              className=" text-text_fade"
              style={{
                fontSize: font_size.fs_16,
                fontFamily: font_fam.anuphan_med,
                marginBottom: ms(6),
              }}
            >
              DOB*
            </Text>

            <View className="w-full flex-row items-center justify-between gap-3">
              {/* Month */}
              <View style={{ flex: 1 }}>
                <Input
                  placeholder="MM"
                  value={month}
                  onChangeText={(t) => setMonth(t)}
                  onBlur={onMonthBlur}
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <Entypo
                          name={
                            Platform.OS === "ios"
                              ? "chevron-small-down"
                              : "chevron-down"
                          }
                          size={20}
                          color={color.black}
                        />
                      )}
                      onPress={openPicker}
                    />
                  }
                />
              </View>

              {/* Day */}
              <View style={{ width: 92 }}>
                <Input
                  mode="outlined"
                  value={day}
                  keyboardType="numeric"
                  onChangeText={(t) => setDay(t.replace(/[^0-9]/g, ""))}
                  onBlur={onDayBlur}
                  placeholder="19"
                  contentStyle={{ fontFamily: font_fam.gantari_semibold }}
                  style={{ fontFamily: font_fam.gantari_semibold }}
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <Entypo
                          name={
                            Platform.OS === "ios"
                              ? "chevron-small-down"
                              : "chevron-down"
                          }
                          size={20}
                          color={color.black}
                        />
                      )}
                      onPress={openPicker}
                    />
                  }
                />
              </View>

              {/* Year */}
              <View style={{ width: 124 }}>
                <Input
                  mode="outlined"
                  value={year}
                  keyboardType="numeric"
                  onChangeText={(t) => setYear(t.replace(/[^0-9]/g, ""))}
                  onBlur={onYearBlur}
                  placeholder="1980"
                  contentStyle={{ fontFamily: font_fam.gantari_semibold }}
                  style={{ fontFamily: font_fam.gantari_semibold }}
                  right={
                    <TextInput.Icon
                      name="chevron-down"
                      onPress={openPicker}
                      color={color.black}
                    />
                  }
                />
              </View>
            </View>
          </View>
        </View>

        <InputLabeled placeholder={"Email"} />
        <View className="w-full ">
          <InputLabeled
            keyboardType="phone-pad"
            left={
              <TextInput.Icon
                icon={() => (
                  <View className=" h-7 items-center justify-center border-r-[1.5px] px-2 border-gray-300">
                    <Text>+1</Text>
                  </View>
                )}
                onPress={() => setShowContryPicker(true)}
              />
            }
            placeholder={"Phone Number"}
          />
        </View>
      </View>
      {showPicker && (
        <DateTimePicker
          key={pickerKey}
          value={pickerDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onPickerChange}
          maximumDate={new Date()}
        />
      )}
      <CountryPicker
        show={showContryPicker}
        inputPlaceholder="Search country"
        searchMessage="Search"
        enableModalAvoiding={true}
        onBackdropPress={() => setShowContryPicker(false)}
        style={{ modal: { height: rh(70) } }}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
    </>
  );
};

const DriverAddress = () => {
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  return (
    <View className="w-full gap-4">
      <InputLabeled
        placeholder={"Gender"}
        options={genderOptions}
        dropdown={true}
      />
      <View className="w-full gap-2">
        <InputLabeled InputLabel="Address" placeholder={"Line address 1"} />
        <Input placeholder={"Line address 2"} />
      </View>
    </View>
  );
};

const DriverDocuments = () => {
  return (
    <View className="w-full gap-6">
      <InputLabeled
        placeholder={"Years of Driving Experience*"}
        keyboardType="numeric"
      />
      <View className="w-full gap-2">
        <Text
          className=" text-text_fade"
          style={{
            fontSize: font_size.fs_16,
            fontFamily: font_fam.anuphan_med,
          }}
        >
          Driving Expertise*
        </Text>
        <View className="flex flex-row items-center">
          <View className="flex flex-row items-center gap-3">
            <View
              className="border-[1.5px] border-col_3"
              style={{
                width: height * 0.024,
                height: height * 0.024,
                borderRadius: height / 2,
              }}
            ></View>
            <Text
              style={{
                fontFamily: font_fam.gantari_variable,
                fontSize: font_size.fs_14,
              }}
            >
              Manual
            </Text>
          </View>
        </View>
        <View className="w-full">
          <Text
            className=" text-text_fade"
            style={{
              fontSize: font_size.fs_16,
              fontFamily: font_fam.anuphan_med,
            }}
          >
            Driving License Front Photo*
          </Text>
          <View
            className="w-full flex-row items-center bg-white"
            style={{
                gap:ms(5),
              borderRadius: ms(10),
              paddingHorizontal: ms(14),
              paddingVertical: ms(10),
            }}
          >
            <LicenseIcon />
            <View className="flex-1">
              <Text
                style={{
                  fontFamily: font_fam.gantari_variable,
                  fontSize: font_size.fs_14,
                }}
                className="font-medium"
              >
                Browse Files
              </Text>
              <Text
                style={{
                  fontFamily: font_fam.gantari_variable,
                  fontSize: font_size.fs_10,
                }}
                className="font-medium text-col_4"
              >
                JPG and PNG, max size 500 x 400 px
              </Text>
            </View>
            <Button
              width={"29%"}
              fontWeight={"500"}
              height={rh(4)}
              fontFamily={font_fam.gantari_variable}
              buttonColor={color.col_3}
              borderRadius={ms(7)}
              fontSize={ms(14)}
              title="Select Files"
            />
          </View>
        </View>
      </View>
    </View>
  );
};
