import axios from "axios";

const skemiAPI = axios.create({
   baseURL: process.env.REACT_APP_API_ENDPOINT,
});

skemiAPI.interceptors.request.use((req) => {
   const token = sessionStorage.getItem("token");
   console.log("Set token header: ", token);
   if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
   }
   return req
})
export default skemiAPI;