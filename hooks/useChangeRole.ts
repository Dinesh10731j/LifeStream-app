import { Endpoints } from "@/api/endpoints";
import axiosInstance from "@/axiosInstance/axiosInstance";
const {Changerole} = Endpoints
import { UserRoleData } from "@/Types";
import { useMutation } from "@tanstack/react-query";
const usechangerole = async (userRoleData:UserRoleData)=>{

    const {role,_id} = userRoleData;

    try{

        const response =await axiosInstance.put(`${Changerole}/${_id}`, { role });
        return response.data;



    }catch(error:unknown){
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An unknown error occured");
        }
    }
}


export const UseChangeRole = ()=>{

return useMutation({
    mutationKey:['changeRole'],
    mutationFn:(userRoleData: UserRoleData)=>usechangerole(userRoleData)
})

}