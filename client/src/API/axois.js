import axios from "axios";

export const createAxiosInstance = (url) => {
  const axiosBase = axios.create({
    headers: { 'Content-Type': 'application/json' },
  });

  // axiosBase.interceptors.request.use((request) => {
  //   const accessToken: string = getAccessToken ?? '';
  //   const accessHeader = `Bearer ${accessToken}`;
  //   if (request.headers != null) {
  //     request.headers.Authorization = accessHeader;
  //   }

  //   return request;
  // });

  axiosBase.interceptors.response.use((response) => {
    return response;
  }, (err) => {
    console.log(err);
  });

  axiosBase.defaults.baseURL = url;

  return axiosBase;
};
