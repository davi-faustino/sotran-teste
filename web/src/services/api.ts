import axios from 'axios';

const api = axios.create({
  baseURL: `http://${window.location.hostname}:3333`
});

export default api;