import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStarted from "../../pages/user/get-started";
import { ROUTE_NAMES } from "../../constants";
import DriverRegister from "../../pages/user/register/driverReg";



const Stack = createNativeStackNavigator()


export default function DriverStack() {
    const options = { headerShown: false }
    return (
        
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name={ROUTE_NAMES.driverTab} component={GetStarted} />
            <Stack.Screen name={ROUTE_NAMES.driverRegister} component={DriverRegister} />
        </Stack.Navigator>
    )
}