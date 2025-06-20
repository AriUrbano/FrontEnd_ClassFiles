import axios from 'axios';

// Configuración de conexión
const API_BASE_URL = 'http://localhost:3001/api';

// Cliente HTTP con reconexión automática
const createApiClient = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 20000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  // Interceptor de solicitudes
  instance.interceptors.request.use(config => {
    console.debug(`🌐 Enviando ${config.method?.toUpperCase()} a ${config.url}`);
    return config;
  });

  // Interceptor de respuestas
  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      
      // Si es error de conexión (sin respuesta)
      if (!error.response) {
        console.error('🔴 Error de red:', {
          message: error.message,
          code: error.code,
          url: originalRequest.url
        });
        
        // Intenta reconectar después de 2 segundos
        await new Promise(resolve => setTimeout(resolve, 2000));
        return instance(originalRequest);
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

// Prueba de conexión inicial
export const testConnection = async () => {
  try {
    const client = createApiClient();
    const response = await client.get('/health-check');
    console.log('🟢 Conexión exitosa con el backend:', response.data);
    return true;
  } catch (error) {
    console.error('🔴 Fallo en conexión inicial:', {
      suggestion: 'Verifica que el backend esté corriendo en http://localhost:3001'
    });
    return false;
  }
};

// Exporta el cliente configurado
export const apiClient = createApiClient();

// Prueba la conexión al cargar el módulo
testConnection();