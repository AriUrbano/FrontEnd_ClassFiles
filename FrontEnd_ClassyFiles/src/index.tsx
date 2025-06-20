import './index.css'; // Importación del CSS (asegúrate que la ruta sea correcta)
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';


// Obtener el elemento contenedor
const container = document.getElementById('root');

if (!container) {
  throw new Error('No se encontró el elemento root');
}

// Crear root y renderizar la aplicación con el CSS incluido
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);