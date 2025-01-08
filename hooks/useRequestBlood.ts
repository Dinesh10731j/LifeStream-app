import { Endpoints } from "@/api/endpoints";
const { Requestblood } = Endpoints;
import axiosInstance from "@/axiosInstance/axiosInstance";
import { requestBloodType } from "@/Types";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

const requestblood = async (requestdata: requestBloodType) => {
  try {
    const response = await axiosInstance.post(Requestblood,requestdata);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occured");
    }
  }
};

export const UseRequestBlood = () => {
  return useMutation({
    mutationKey: ["requestblood"],
    mutationFn: requestblood,
    onSuccess:()=>{
        Toast.show({
            type:'success',
            text1:'Success',
            text1Style:{fontSize:20},
            text2:'Blood Request Successful',
           
        });
    },onError:()=>{
        Toast.show({
            type:'error',
            text1:'Failed',
            text1Style:{fontSize:20},
            text2:'Blood Request Failed'

        })
    }
  });
};
