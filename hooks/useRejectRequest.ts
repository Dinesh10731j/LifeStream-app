import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "@/api/endpoints";
import axiosInstance from "@/axiosInstance/axiosInstance";
const {Rejectrequest} = Endpoints
const userejectrequest = async (requestId:string)=>{
    try{
const response = await axiosInstance.put(`${Rejectrequest}/${requestId}`);
return response.data
    }catch(error:unknown){
        if(error instanceof Error){
            throw new Error(error.message)
        }else{
            throw new Error("An unknown error occured.Please try again");
        }
    }
}


export const UseRejectRequest = ()=>{
    return useMutation({
        mutationKey:['rejectrequest'],
        mutationFn:userejectrequest
    })
}