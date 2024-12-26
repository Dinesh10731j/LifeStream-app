import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";

const { Deleteuser } = Endpoints;
const usedeleteuser = async (userId: string) => {
  try {
    const response = await axiosInstance.delete(`${Deleteuser}/${userId}`);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occured");
    }
  }
};


export const UseDeleteUser = ()=>{
    return useMutation({
        mutationKey:['deleteUser'],
        mutationFn:usedeleteuser
    })
}
