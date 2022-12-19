import axios from "axios";

const instance = axios.create({
  // baseURL: 'http://localhost:8085/api',
  baseURL: "https://springboot-mongo-app.herokuapp.com/api/",
  timeout: 30000,
  // withCredentials: true,
  // headers: {
  //     Authorization: 'Bearer {token}'
  // }
  // withCredentials: true
});

instance.defaults.headers.common["Content-Type"] = "application/json";

instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
