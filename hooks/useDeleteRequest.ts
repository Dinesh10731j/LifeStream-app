import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";
const {DeleteRequest} = Endpoints
const deleterequest = async (requestId:string)=>{
    console.log("This is requestID",requestId);
    try{
        const response = await axiosInstance.delete(DeleteRequest, {
            data: { requestId },
          });


          console.log("This is  delete response data",response.data);
        return response.data;


    }catch(error:unknown){

        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An unknown error occured");
        }
        
    }
}



export const  UseDeleteRequest  = ()=>{
    return useMutation({
        mutationKey:['deleteRequest'],
        mutationFn:deleterequest
    })
}