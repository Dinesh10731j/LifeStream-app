import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { LoginType } from "@/Types";
import { useRoute } from "@react-navigation/native";
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

    return useMutation({
        mutationKey:['userLogin'],
        mutationFn:userlogin,
        onSuccess:()=>{
           alert("Login Success");

      

        },onError:()=>{
            alert("Login Failed")
        }
    })}
