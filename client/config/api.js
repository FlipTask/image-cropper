import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.API_URL}/api/v1`,
});

export default axiosInstance;
