import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";
const { Totaldonordonation } = Endpoints;
const donorinfo = async () => {
  try {
    const response = await axiosInstance.get(Totaldonordonation);
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occured");
    }
  }
};

export const UseDonorInfo = () => {
  return useQuery({
    queryKey: ["Donorinfo"],
    queryFn: donorinfo,
    staleTime: 1000,
    refetchInterval: 1000,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
    retry: 1000,
  });
};
