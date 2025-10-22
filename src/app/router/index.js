import { NavigationContainer } from "@react-navigation/native"
import { authStore } from "../zustand/authStore"
import AuthStack from "./authStack"
import { useEffect, useState } from "react"
import { SplashScreen } from "../components/screens/splashscreen"
import RiderStack from "./riderStack"





export default function RouteHandler() {
    const { roleAuthDetails,setRoleAuthDetails } = authStore((state) => state)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        handleSplashScreen()
    }, [])


    const handleSplashScreen = () => {

        setTimeout(() => {
            // setRoleAuthDetails('rider')
            setLoading(false)
        }, 3000);
    }

    if (loading) {
        return <SplashScreen />
    }

    return (
        <NavigationContainer>
            {!roleAuthDetails && <AuthStack />}
            {/* {roleAuthDetails === 'driver' && <DriverStack/>} */}
            {roleAuthDetails === 'rider' && <RiderStack/>}

        </NavigationContainer>
    )
}