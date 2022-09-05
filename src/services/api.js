// Importando biblioteca para fazer requisições via HTTP
import axios from 'axios';


// https://economia.awesomeapi.com.br/json/all
const api = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/json/'
});


// Exportando função
export default api;