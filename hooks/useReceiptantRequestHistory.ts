import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
const {Bloodrequesthistory} = Endpoints
const receiptantrequesthistory = async ()=>{

    try{

        const email = await AsyncStorage.getItem('email') || "";
        const response = await axiosInstance.get(`${Bloodrequesthistory}/${email}`);
        return response.data.data;
       
    }catch(error:unknown){
        if(error instanceof Error){
            throw new Error(error.message)
        }else{
            throw new Error("An unknown error occcured");
        }
    }
}

export const UseReceiptantHistory =  ()=>{
    return useQuery({
        queryKey:['receiptanthistory'],
        queryFn:receiptantrequesthistory,
        staleTime:1000,
        refetchInterval:1000,
        refetchOnMount:'always',
        refetchOnReconnect:'always',
        refetchOnWindowFocus:'always',
        refetchIntervalInBackground:true
    })
}