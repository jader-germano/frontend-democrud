import axios from 'axios';

const apiPostOffice = axios.create({
    baseURL: `http://viacep.com.br/ws/`,
});
export default apiPostOffice;