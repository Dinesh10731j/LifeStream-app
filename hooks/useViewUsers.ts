import { Endpoints } from "@/api/endpoints";
const { Users } = Endpoints;
import axiosInstance from "@/axiosInstance/axiosInstance";
import { useQuery } from "@tanstack/react-query";
const viewusers = async () => {
  try {
    const response = await axiosInstance.get(Users);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const UseViewUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn:viewusers,
    staleTime: 1000,
    refetchInterval: 1000,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
  });
};
