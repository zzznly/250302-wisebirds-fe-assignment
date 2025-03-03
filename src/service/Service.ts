import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
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

  private async handleResponseError(error: AxiosError): Promise<never> {
    console.error('Response error:', error);

    let message = '에러가 발생했습니다.';
    if (error.response?.data && (error.response.data as any).message) {
      message = (error.response.data as any).message;
    }
    // 전역 에러 스토어에 에러 메시지 저장 -> 모달에서 감지
    useAppStore.getState().setError(message);

    return Promise.reject(error);
  }
}
