import axios from 'axios';

const axiosBase = axios.create({
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

axiosBase.interceptors.response.use((response) => {
    return response.data.result;
  }, (err) => {
    console.log(err);
  });

  axiosBase.defaults.baseURL = url;

  return axiosBase;
};