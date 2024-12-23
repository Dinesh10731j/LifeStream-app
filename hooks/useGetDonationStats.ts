import { Endpoints } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
const {donationStats} = Endpoints;


const getDonationstats = async ()=>{

    try{

        const statsresponse = await axiosInstance.get(donationStats);

        return statsresponse.data.data;

    }catch{
        throw new Error('Failed to fecth  data')
    }

}


export const UsegetDonationstats = ()=>{
    return useQuery({queryKey:['donationstats'],queryFn:getDonationstats, staleTime: 1000,
        refetchInterval: 1000,
        refetchOnMount: "always",
        refetchOnWindowFocus: "always",})
}