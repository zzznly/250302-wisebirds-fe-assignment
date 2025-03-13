import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useAppStore } from '@/stores';
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

  private async handleResponseError(error: AxiosError<{ message: string }>): Promise<never> {
    const setGlobalErrorMessage = useAppStore(state => state.setGlobalErrorMessage);

    const DEFAULT_GLOBAL_ERROR_MSG =
      '에러가 발생했습니다.<br/>같은 현상이 발생하면 고객센터로 문의 바랍니다.<br/><br/>*고객센터<br/>- email: helpdesk@wisebirds.ai';
    let responseErrorMessage = DEFAULT_GLOBAL_ERROR_MSG;

    if (error.response?.data && error.response.data.message) {
      responseErrorMessage = error.response.data.message;
    }
    setGlobalErrorMessage(responseErrorMessage);

    return Promise.reject(error);
  }
}
