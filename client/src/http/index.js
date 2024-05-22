import axios from 'axios';
import config from "../config";
import inMemoryJWT from '../Services/inMemoryJWT';

const $api = axios.create({
    withCredentials: true,
    baseURL: `${config.API_URL}`,
})

$api.interceptors.request.use((config) => {
    const accesToken = inMemoryJWT.getToken();
    // console.log(accesToken);
    if(accesToken) {
      config.headers["Authorization"] = `Bearer ${accesToken}`;
    }

    return config;
}, (error) => {
    Promise.reject(error)
})

export default $api;