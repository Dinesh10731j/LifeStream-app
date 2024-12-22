import axios from "axios";
import Cookies from "js-cookie";

const BaseUrl ="https://lifestream-api-1.onrender.com";


 const axiosInstance = axios.create({
    baseURL:BaseUrl
});


axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token');
  
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  export default axiosInstance;