import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:8080/`,
});

const apiPostOffice = axios.create({
    baseURL: `http://viacep.com.br/ws/`,
});

export { api, apiPostOffice };
