import axios from 'axios';

const request = axios.create({
    withCredentials: true,
    baseURL: 'http://45.77.32.24:5000',
});

export default request;