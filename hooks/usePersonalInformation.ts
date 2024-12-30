import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { UpdateInfo } = Endpoints;
import { useMutation } from "@tanstack/react-query";
interface DonorInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
}
const useupdatepersonalinfo = async (data:DonorInfo) => {
  try {
    const userId = (await AsyncStorage.getItem("userid")) || "";
  

    const response = await axiosInstance.patch(`${UpdateInfo}/${userId}`,data);
  
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occured");
    }
  }
};

export const UseUserInfoUpdate = () => {
  return useMutation({
    mutationKey: ["userinfo"],
    mutationFn: useupdatepersonalinfo,
  });
};
