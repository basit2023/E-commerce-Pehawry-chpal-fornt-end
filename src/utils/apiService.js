import axios from 'axios';

const apiService = axios.create({
    baseURL: "https://kind-pink-nightingale-sock.cyclic.app",
    withCredentials: true
})

export default apiService;
