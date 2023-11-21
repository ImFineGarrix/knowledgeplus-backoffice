import axios from 'axios';
import humps from 'humps';

class HttpRequest {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:8081/api',
      // baseURL: process.env.NUXT_ENV_API_URL,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => ({
        ...config,
        data: config.data ? humps.decamelizeKeys(config.data) : config.data,
        params: config.params ? humps.decamelizeKeys(config.params) : config.params,
      }),
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => humps.camelizeKeys(response.data),
      (error) => {
        const newError = new Error(error);
        if (error?.response) {
          return Promise.reject(error.response.data);
        }
        const errorFail = {
          code: 503,
          message: newError.message,
        };
        throw errorFail;
      }
    );
  }

  setHeader(header) {
    this.axiosInstance.defaults.headers.common[header.key] = header.value
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  get(endpoint, data, config) {
    const params = {
      params: data
    }
    const newParams = Object.assign(params, config)
    return this.axiosInstance.get(endpoint, newParams)
  }

  post(endpoint, data, config) {
    return this.axiosInstance.post(endpoint, data, config)
  }

  put(endpoint, data, config) {
    return this.axiosInstance.put(endpoint, data, config)
  }

  patch(endpoint, data, config) {
    return this.axiosInstance.patch(endpoint, data, config)
  }

  remove(endpoint, data, config) {
    const params = { data }
    const newParams = Object.assign(params, config)
    return this.axiosInstance.delete(endpoint, newParams)
  }

  delete(endpoint, id, config) {
    const params = {
      params: {
        id
      }
    }
    const newParams = Object.assign(params, config)
    return this.axiosInstance.delete(endpoint, newParams)
  }
}

export default HttpRequest;
