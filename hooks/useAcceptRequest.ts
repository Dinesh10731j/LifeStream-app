import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";
const {Acceptrequest} = Endpoints
const acceptrequest = async (requestId:string)=>{
    try{

        const response = await axiosInstance.put(`${Acceptrequest}/${requestId}`);
        return response.data;

    }catch(error:unknown){
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An unknown error occured.Please try again");
        }
    }
}


export const UseAcceptRequest = ()=>{
    return useMutation({
        mutationKey:['acceptrequest'],
        mutationFn:acceptrequest
    })
}