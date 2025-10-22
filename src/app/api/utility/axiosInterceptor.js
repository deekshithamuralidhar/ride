import axios from "axios";
import { BASE_URL } from "../../constants";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export const axiosInterceptor = axios.create({
    baseURL: BASE_URL.url,
});

axiosInterceptor.interceptors.request.use(async (config) => {
    //   const token = await AsyncStorage.getItem("token");
    //   console.log(token,'tokenAxios')
    //   if (token) {
    //     config["headers"]["Authorization"] = `Bearer ${token}`;
    //   }

    return config;
});

axiosInterceptor.interceptors.response.use((response) => {
    return response;
});
