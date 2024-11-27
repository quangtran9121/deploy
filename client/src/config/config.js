import axios from 'axios';

const request = axios.create({
    withCredentials: true,
    baseURL: 'http://backend:5000',
});

export default request;