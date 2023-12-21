import axios from 'axios';

const App_URL= 'http://localhost:8800';

export const API = axios.create({
    baseURL: App_URL,
    responseType: 'json',
});