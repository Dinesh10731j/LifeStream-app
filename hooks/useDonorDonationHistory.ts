import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { Donorhistory } = Endpoints;
import base64 from "react-native-base64";
const usedonordonationhistory = async () => {
  try {
    const email = (await AsyncStorage.getItem("email")) || " ";
    const encodedEmail = base64.encode(email);
    const response = await axiosInstance.get(`${Donorhistory}/${encodedEmail}`);
    console.log("This is response", response.data);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occured");
    }
  }
};

export const UseDonorHistory = () => {
  return useQuery({
    queryKey: ["donorHistory"],
    queryFn: usedonordonationhistory,
    staleTime: 1000,
    refetchInterval: 1000,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
  });
};
