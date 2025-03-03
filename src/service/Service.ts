import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export default class Service {
  service: AxiosInstance;

  constructor({ baseURL = `${import.meta.env.VITE_API_BASE_URL}` }: { baseURL?: string } = {}) {
    this.service = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.service.interceptors.request.use(this.handleRequest.bind(this), Service.handleRequestError);
    this.service.interceptors.response.use(Service.handleResponse, this.handleResponseError.bind(this));
  }

  private handleRequest<T>(config: InternalAxiosRequestConfig<T>): InternalAxiosRequestConfig<T> {
    return config;
  }

  private static handleRequestError(error: AxiosError | unknown): Promise<never> {
    console.error('Request error:', error);
    return Promise.reject(error);
  }

  private static handleResponse<T>(response: T): T {
    return response;
  }

  private async handleResponseError(error: AxiosError): Promise<never> {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
}
