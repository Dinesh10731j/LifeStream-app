import axiosInstance from "@/axiosInstance/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "@/api/endpoints";
const { Donordonationstats } = Endpoints;
import base64 from "react-native-base64";
import AsyncStorage from "@react-native-async-storage/async-storage";

const usedonorstats = async (): Promise<any> => {
  try {
    const email = (await AsyncStorage.getItem("email")) || "";
    const encodedEmail = base64.encode(email);

    const response = await axiosInstance.get(
      `${Donordonationstats}/${encodedEmail}`
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};


export const UseDonorStats = () => {
  return useQuery({
    queryKey: ["DonorStats"],
    queryFn: usedonorstats,
    staleTime: 1000,
    refetchInterval: 1000,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
  });
};
