import axios from 'axios';
import 'dotenv/config';

// console.log(`> api: ${process.env.REACT_APP_API_URL}`);

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export default api;
