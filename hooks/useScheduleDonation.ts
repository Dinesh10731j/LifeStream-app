import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { ScheduleDonationFormData } from "@/Types";
const { Scheduledonation } = Endpoints;
const usescheduledonation = async (data:ScheduleDonationFormData) => {

  try {
    const response = await axiosInstance.post(Scheduledonation,data);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occured");
    }
  }
};

export const UseScheduleDonation = () => {
  return useMutation({
    mutationKey: ["scheduledonation"],
    mutationFn: usescheduledonation,

    
  });
};
