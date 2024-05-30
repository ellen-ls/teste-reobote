import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://teste.reobote.tec.br/api', // Ajuste para a URL da sua API
});

export default axiosInstance;