import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function TestConnection() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      // Usa la ruta relativa (/api) que pasa por el proxy de Vite
      const response = await axios.get('/api/health');
      setResult(JSON.stringify(response.data, null, 2));
      console.log('✅ Conexión exitosa:', response.data);
    } catch (error) {
      const errorData = {
        message: error.message,
        code: error.code,
        config: {
          url: error.config?.url,
          method: error.config?.method
        },
        response: error.response?.data || 'Sin respuesta del servidor'
      };
      setResult(JSON.stringify(errorData, null, 2));
      console.error('❌ Error de conexión:', errorData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Prueba de Conexión Backend</h3>
      <div style={styles.buttonContainer}>
        <button 
          onClick={testConnection}
          disabled={loading}
          style={loading ? styles.buttonLoading : styles.button}
        >
          {loading ? 'Probando...' : 'Probar Conexión'}
        </button>
        <button 
          onClick={() => window.open('http://localhost:3001/api/health')}
          style={styles.secondaryButton}
        >
          Probar Manualmente
        </button>
      </div>
      <pre style={styles.result}>
        {result || 'Haz click para probar la conexión...'}
      </pre>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '15px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    maxWidth: '400px'
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px'
  },
  button: {
    padding: '8px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  buttonLoading: {
    padding: '8px 15px',
    backgroundColor: '#cccccc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed'
  },
  secondaryButton: {
    padding: '8px 15px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  result: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    maxHeight: '200px',
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  }
};