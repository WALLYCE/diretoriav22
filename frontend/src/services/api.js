const axios = require ("axios");

const config = {
    baseURL: 'http://192.168.88.88:5000'
};
 const api = axios.create(config);

api.interceptors.response.use((response) => {
    if(response.status === 401) {
         console.log("You are not authorized");
          alert("You are not authorized");
    }
    return response;
}, (error) => {
    if (error.response && error.response.data && error.response.status === 401) {
       window.location = '/login'
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});

 module.exports = api
