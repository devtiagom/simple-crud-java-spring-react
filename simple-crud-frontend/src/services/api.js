import axios from 'axios';

const serverPort = 8080;
const serverBaseUrl = "http://localhost";

const api = axios.create({
  baseURL: `${serverBaseUrl}:${serverPort}`
});

export default api;