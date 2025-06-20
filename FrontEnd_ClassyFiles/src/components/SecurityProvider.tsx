import React, { useEffect } from 'react';

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Bloqueo de consola solo en producción
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log = () => {};
      console.warn = () => {};
      console.error = () => {};
    }
  }, []);

  // Protección de campos de contraseña
  useEffect(() => {
    const protectPasswordFields = () => {
      document.querySelectorAll('input[type="password"]').forEach(input => {
        // Forzar tipo password cada segundo (solución robusta)
        if (input.getAttribute('type') !== 'password') {
          input.setAttribute('type', 'password');
        }
      });
    };

    // Verificación periódica + observer
    const interval = setInterval(protectPasswordFields, 1000);
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'type') {
          const target = mutation.target as HTMLInputElement;
          if (target.type !== 'password' && 
              (target.name?.includes('password') || target.id?.includes('password'))) {
            target.type = 'password';
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['type']
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
};