import axiosInstance from "@/axiosInstance/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "@/api/endpoints";
import { useLocalSearchParams } from "expo-router";
const {Userhistory} = Endpoints
const viewhistory = async (userId:string)=>{
    try{

        const response = await axiosInstance.get (`${Userhistory}/${userId}`);
        return response.data;

    }catch(error:unknown){
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error('An unknown error occured');
        }
    }
}


export const UseViewHistory = (userId:string)=>{
    return useQuery({
        queryKey:['userHistory',userId],
        queryFn:()=>viewhistory(userId)
    })
}