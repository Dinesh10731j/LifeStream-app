import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { LoginType } from "@/Types";
import { useRouter } from "expo-router";
const {userLogin}= Endpoints;
import {useMutation} from "@tanstack/react-query";

const userlogin = async (data:LoginType)=>{
    try{

        const response = await axiosInstance.post(userLogin,data);

        return response.data

    }catch(error:unknown){
        if(error instanceof Error){
            throw new Error(error?.message);
        }else{
            throw new Error("An unknown error occured")
        }
    }
}




export const UserUserLogin = ()=>{

    const router = useRouter();

    return useMutation({
        mutationKey:['userLogin'],
        mutationFn:userlogin,
        onSuccess:(data)=>{
          

           alert("Login Success");
           if(data.data?.role === "admin"){
               router.push('/(dashboard)/admin/donationoverview');
             }
           
           if(data.data?.role === "donor"){
             router.push('/(dashboard)/donor/donor')
           }
           
           if(data.data?.role === "receiptant"){
             router.push('/(dashboard)/receiptant/receiptant')
           }

      

        },onError:()=>{
            alert("Login Failed")
        }
    })}
