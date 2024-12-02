import axios from 'axios';

const request = axios.create({
    withCredentials: true,
    baseURL: 'https://quangtt.backendintern.online',
});

export default request;