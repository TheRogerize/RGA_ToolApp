import axios from 'axios';

export default () => {
    return axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com/',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }