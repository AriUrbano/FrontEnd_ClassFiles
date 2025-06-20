import { useState, useEffect } from 'react';

export const useFormSecurity = () => {
  const [isTampered, setIsTampered] = useState(false);

  // Sanitizar inputs
  const sanitizeInput = (value: string): string => {
    const dangerousChars = ['<', '>', '&', "'", '"', '`', '\\', ';', '--'];
    return value.split('').map(char => 
      dangerousChars.includes(char) ? '' : char
    ).join('');
  };

  // Validar contraseña segura
  const validatePassword = (password: string): { valid: boolean; message: string } => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasMinLength) return { valid: false, message: 'Mínimo 8 caracteres' };
    if (!hasUpperCase) return { valid: false, message: 'Al menos 1 mayúscula' };
    if (!hasNumber) return { valid: false, message: 'Al menos 1 número' };
    if (!hasSpecialChar) return { valid: false, message: 'Al menos 1 carácter especial' };
    
    return { valid: true, message: '' };
  };

  // Protección de campos sensibles
  const secureInputProps = (name: string) => ({
    name,
    onPaste: (e: React.ClipboardEvent) => {
      if (name.includes('password')) {
        e.preventDefault();
      }
    },
    onCopy: (e: React.ClipboardEvent) => {
      if (name.includes('password')) {
        e.preventDefault();
      }
    },
    autoComplete: name.includes('password') ? 'new-password' : 'off'
  });

  return { isTampered, sanitizeInput, validatePassword, secureInputProps };
};