import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://178.63.13.157:8090/mock-api/api',
});
