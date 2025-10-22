import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../../../pages/main-app/rider/profile";
import { View } from "react-native";




const Tab = createBottomTabNavigator();
export default function RiderTabs() {
    return (
        <Tab.Navigator  tabBar={(props)=><View className='w-full h-9 bg-red-500'></View>} screenOptions={{ headerShown: false }}>
            <Tab.Screen name="profile" component={Profile} />
        </Tab.Navigator>
    )
}