import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Profile from "../../pages/main-app/rider/profile"
import RiderTabs from "./tabs"
import { ROUTE_NAMES } from "../../constants"







const Stack = createNativeStackNavigator()


export default function RiderStack() {
    const options = { headerShown: false }
    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name={ROUTE_NAMES.riderTab} component={RiderTabs} />
        </Stack.Navigator>
    )
}