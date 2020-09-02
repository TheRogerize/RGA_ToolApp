  const axios = require('axios');
  const axiosInstance = axios.create({
    baseURL: '/api/',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(axiosInstance.defaults)
  export { axiosInstance }

