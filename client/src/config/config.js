import axios from 'axios';

const request = axios.create({
    withCredentials: true,
    baseURL: 'http://quangtt.backendintern.online',
});

export default request;