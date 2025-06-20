// src/api/apiClient.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios';

// Interface para respuestas API estandarizadas
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor de solicitud
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse<ApiResponse> => ({
    ...response,
    data: {
      success: true,
      data: response.data,
      status: response.status
    }
  }),
  (error: AxiosError): Promise<AxiosResponse<ApiResponse>> => {
    const errorResponse: ApiResponse = {
      success: false,
      error: (error.response?.data as any)?.error || error.message || 'Error de conexión',
      status: error.response?.status
    };

    console.error('Error en la petición:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      error: errorResponse.error
    });

    return Promise.reject({
      ...error,
      response: {
        ...error.response,
        data: errorResponse
      }
    });
  }
);

export default apiClient;