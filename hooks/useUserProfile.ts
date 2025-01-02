import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const { Userprofile } = Endpoints;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

const userprofile = async () => {
  try {
    const userId = (await AsyncStorage.getItem("userid")) || " ";

    const response = await axiosInstance.get(`${Userprofile}/${userId}`);

    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occured");
    }
  }
};

export const UseUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: userprofile,
    staleTime: 1000,
    refetchInterval: 1000,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
    refetchIntervalInBackground: true,
  });
};
