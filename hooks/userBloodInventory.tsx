import { Endpoints } from "@/api/endpoints";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { useQuery } from "@tanstack/react-query";
const { DonationInfo } = Endpoints;
const fetchdonationinfo = async () => {
  const response = await axiosInstance.get(DonationInfo);

  return response.data;
};

export const Usedonationinfo = () => {
  return useQuery({
    queryKey: ["donationinfo"],
    queryFn: fetchdonationinfo,
    staleTime: 1000,
    refetchInterval: 1000,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    });
  };