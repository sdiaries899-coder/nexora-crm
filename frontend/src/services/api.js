import axios from "axios";
// this file used to send req to baackend 
//check coockies and avoid multiple req at same time 


//this below code will create axios instance which is used to send http req every time that is reusable api code 
// has base url from .env 
// withCredentials is true cause it send coockies with every req
// this true is imp cause authentication used that coockies 
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/**
 * Queue handling for token refresh
 */
let isRefreshing = false;
let failedQueue = [];
// check ref token is already running or not 
//failed queues are nothing but if req 1 failed then all req 2 ,3 .. are stored in this 

//if error is none then it will check all pending req from the fquies list 
// //if error then reject all promise otherwise resolve all pending req

// this functio procesques runs after refreshtoken process finishesh
const processQueue = (error = null) => {
//make function processqueue and take one parameter error is null
//this failedQues.forEach((prom) => {}) this run for each promise stored in failedqueues
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);//if refresh failed every pending request failed 
    else prom.resolve();//resolve all waiting request in this 
  });
  failedQueue = [];// set to null after the all queues are resolved
};

/**
 * Response Interceptor
 */
// all respeonce from backend passes through this block act as security for the same 
API.interceptors.response.use(
  (response) => response,//if everything ok then just return responce 
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => API(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        processQueue();
        return API(originalRequest);
      } catch (err) {
        processQueue(err);
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;