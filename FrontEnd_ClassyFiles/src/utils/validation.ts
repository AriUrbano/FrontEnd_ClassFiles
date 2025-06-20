// Lista de palabras/cláusulas SQL peligrosas
const SQL_INJECTION_PATTERNS = [
  'DROP\\s+(TABLE|DATABASE)',
  'DELETE\\s+FROM',
  'INSERT\\s+INTO',
  'UPDATE\\s+\\w+\\s+SET',
  'SELECT\\s+\\*\\s+FROM',
  'ALTER\\s+TABLE',
  'TRUNCATE\\s+TABLE',
  'CREATE\\s+(TABLE|DATABASE)',
  'EXEC(UTE)?\\s*\\(',
  'UNION\\s+SELECT',
  'OR\\s+1\\s*=\\s*1',
  '--', 
  ';', 
  '\\/\\*', 
  '\\*\\/',
  'XP_',
  'WAITFOR\\s+DELAY',
  'SHUTDOWN',
  'DECLARE\\s+@',
  'CAST\\(',
  'CONVERT\\(',
  'BENCHMARK\\(',
  'SLEEP\\('
];

// Expresión regular combinada
const SQL_INJECTION_REGEX = new RegExp(`(${SQL_INJECTION_PATTERNS.join('|')})`, 'i');

// Dominios de email no corporativos
const FREE_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
  'aol.com', 'protonmail.com', 'mail.com', 'yandex.com',
  'zoho.com', 'gmx.com', 'icloud.com', 'live.com'
];

// Función para detectar inyección SQL
export const detectSQLInjection = (input: string): boolean => {
  return SQL_INJECTION_REGEX.test(input);
};

// Función de sanitización avanzada
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  // Primero verificar inyección SQL
  if (detectSQLInjection(input)) {
    throw new Error('Intento de inyección SQL detectado');
  }

  // Luego sanitizar
  return input
    .replace(/[<>"'`\\;%&|]/g, '') // Caracteres peligrosos
    .replace(/\b(script|on\w+)\b/gi, '') // Eventos JS
    .replace(/\s+/g, ' ') // Múltiples espacios
    .trim();
};

// Validación de email corporativo
export const validateCompanyEmail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return !!domain && !FREE_EMAIL_DOMAINS.includes(domain);
};
// Validación de contraseña robusta
export const validatePassword = (password: string): { valid: boolean; message: string } => {
  // Primero verificar inyección SQL
  if (detectSQLInjection(password)) {
    return { valid: false, message: 'La contraseña contiene patrones no permitidos' };
  }

  const requirements = [
    { test: password.length >= 12, message: 'Mínimo 12 caracteres' },
    { test: /[A-Z]/.test(password), message: 'Al menos 1 mayúscula' },
    { test: /[a-z]/.test(password), message: 'Al menos 1 minúscula' },
    { test: /[0-9]/.test(password), message: 'Al menos 1 número' },
    { test: /[^A-Za-z0-9]/.test(password), message: 'Al menos 1 carácter especial' },
    { 
      test: !/(123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|qwerty|asdfgh|zxcvbn)/i.test(password),
      message: 'Secuencias simples no permitidas' 
    },
    { test: !/(.)\1{2,}/.test(password), message: 'No más de 2 caracteres repetidos' },
    { test: !/(password|contraseña|admin|root|welcome|login|empresa|compania)/i.test(password),
      message: 'Palabras prohibidas detectadas' },
    { 
      test: !new RegExp(`(${[
        'enero','febrero','marzo','abril','mayo','junio',
        'julio','agosto','septiembre','octubre','noviembre','diciembre'
      ].join('|')})`, 'i').test(password),
      message: 'No usar meses del año' 
    },
    { 
      test: !/(199\d|200\d|201\d|202[0-5])/.test(password),
      message: 'No usar años comunes' 
    }
  ];

  const failedRequirement = requirements.find(req => !req.test);
  return {
    valid: !failedRequirement,
    message: failedRequirement?.message || ''
  };
};

// Validación de nombre (usuarios)
export const validateUserName = (name: string): boolean => {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/.test(name);
};

// Validación de nombre de empresa
export const validateCompanyName = (name: string): boolean => {
  return /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s&.,-]{3,100}$/.test(name);
};

export const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Acepta campo vacío
  return /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.\/0-9]{7,15}$/.test(phone);
};
// Calculador de fortaleza de contraseña (0-100)
export const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 12) strength += 20;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[a-z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 20;
  if (/[^A-Za-z0-9]/.test(password)) strength += 20;
  return Math.min(strength, 100);
};