import axios from 'axios';

axios.interceptors.response.use(
  response => response,
  error => {
    const status = error.response ? error.response.status : null;
    
    if (status === 401) {
      console.log('Unauthorized');
    } else if (status === 404) {
      console.log('404 Not Found');
    } else {
      // Handle other errors
    }
    
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(config => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});

export default axios;