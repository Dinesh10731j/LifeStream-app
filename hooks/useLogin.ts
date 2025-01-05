import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { LoginType } from "@/Types";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { userLogin } = Endpoints;

const userlogin = async (data: LoginType) => {
  try {
    const response = await axiosInstance.post(userLogin, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const UserUserLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["userLogin"],
    mutationFn: userlogin,
    onSuccess: async (data) => {
      const userId = data.data?._id;
      const email = data.data?.email;

      if (userId && email) {
        // Store data in AsyncStorage
        await AsyncStorage.setItem("userid", userId);
        await AsyncStorage.setItem("email", email);
      }

      // Handle admin login
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

      // Handle donor login
      if (data.data?.role === "donor") {
        Toast.show({
          type: "success",
          text1: "Login Success",
          visibilityTime: 4000,
          autoHide: true,
          position: "top",
        });

        setTimeout(() => {
          router.push("/(dashboard)/donor/donoroverview");
        }, 1000);
      }

      // Handle receiptant login
      if (data.data?.role === "recipient") {
        Toast.show({
          type: "success",
          text1: "Login Success",
          visibilityTime: 4000,
          position: "top",
          autoHide: true,
        });

        setTimeout(() => {
          router.push("/(dashboard)/receiptant/receiptantoverview");
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
