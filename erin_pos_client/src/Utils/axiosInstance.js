import axios from 'axios';

export const ApiUser = axios.create({
    baseURL: process.env.REACT_APP_USER_API,
    withCredentials: true,
})