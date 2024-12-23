import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { LoginType } from "@/Types";
const {userSignup}= Endpoints;
import {useMutation} from "@tanstack/react-query";

const usersignup = async (data:LoginType)=>{
    try{

        const response = await axiosInstance.post(userSignup,data);

        return response.data

    }catch(error:unknown){
        if(error instanceof Error){
            throw new Error(error?.message);
        }else{
            throw new Error("An unknown error occured")
        }
    }
}




export const UserUserSignup = ()=>{

    return useMutation({
        mutationKey:['userSignup'],
        mutationFn:usersignup,
        onSuccess:()=>{
           alert("Signup Success");

      

        },onError:()=>{
            alert("Signup Failed")
        }
    })}
