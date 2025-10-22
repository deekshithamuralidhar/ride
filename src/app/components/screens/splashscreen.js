


import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";





export const SplashScreen = () => {

    return (
        <View className='flex-1 gap-2  items-center justify-center'>
              <Text className='text-xl font-bold'>Magic bees</Text>
            <ActivityIndicator animating size={50}/>

        </View>
    )
}