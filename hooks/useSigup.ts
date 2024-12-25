import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { LoginType } from "@/Types";
const {userSignup}= Endpoints;
import {useMutation} from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import {useRouter} from "expo-router"

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

    const router = useRouter();

    return useMutation({
        mutationKey:['userSignup'],
        mutationFn:usersignup,
        onSuccess:()=>{
         Toast.show({
            type:'success',
            text1:'Signup Successful',
            position:'top',
            visibilityTime:4000,
            autoHide:true,
            
         });

         

         setTimeout(() => {
            router.push('/');
          }, 1000);

      

        },onError:()=>{

            console.log('Error occured');
            Toast.show({
                type:'error',
                text1:'Signup failed',
                position:'top',
                visibilityTime:4000,
                autoHide:true
            })
        }
    })}
