import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333', // O endereço onde o nosso backend está rodando
});