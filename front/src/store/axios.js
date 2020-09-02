const axios = require('axios');
const axiosInstance = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});
export { axiosInstance }

