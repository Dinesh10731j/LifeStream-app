import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { LoginType } from "@/Types";
import { useRouter } from "expo-router";
const { userLogin } = Endpoints;
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

const userlogin = async (data: LoginType) => {
  try {
    const response = await axiosInstance.post(userLogin, data);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    } else {
      throw new Error("An unknown error occured");
    }
  }
};

export const UserUserLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["userLogin"],
    mutationFn: userlogin,
    onSuccess: (data) => {
      if (data.data?.role === "admin") {
        Toast.show({
          type: "success",
          text1: "Login Success",
          visibilityTime: 4000,
          position: "top",
          autoHide: true,
        });

        setTimeout(() => {
          router.push("/(dashboard)/admin/donationoverview");
        }, 1000);
      }

      if (data.data?.role === "donor") {
        Toast.show({
          type: "success",
          text1: "Login Success",
          visibilityTime: 4000,
          autoHide: true,
          position: "top",
        });

        setTimeout(() => {
          router.push("/(dashboard)/donor/donor");
        }, 1000);
      }

      if (data.data?.role === "receiptant") {
        Toast.show({
          type: "success",
          text1: "Login Success",
          visibilityTime: 4000,
          position: "top",
          autoHide: true,
        });

        setTimeout(() => {
          router.push("/(dashboard)/receiptant/receiptant");
        }, 1000);
      }
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        visibilityTime: 4000,
        autoHide: true,
      });
    },
  });
};
