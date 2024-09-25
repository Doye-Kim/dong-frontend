import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://j11e203.p.ssafy.io/api',
  withCredentials: true,
});

export default axiosInstance;
