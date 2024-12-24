import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";
const { manageReceiptant } = Endpoints;
const managebloodrequest = async () => {
  try {
    const response = await axiosInstance.get(manageReceiptant);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occured.Please try again");
    }
  }
};

export const UseManageBloodRequest = () => {
  return useQuery({
    queryKey: ["managebloodrequest"],
    queryFn: managebloodrequest,
    staleTime: 1000,
    refetchInterval: 1000,
    refetchOnReconnect: "always",
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });
};
