import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, MailIcon, PhoneIcon, LockIcon, CheckCircle, XCircle } from 'lucide-react';
import { 
  validatePassword, 
  sanitizeInput, 
  validateUserName,
  validatePhone,
  calculatePasswordStrength
} from '../../../utils/validation';

interface RegisterFormProps {
  setIsAuth: (value: boolean) => void;
  setUserType: (type: 'user' | 'company' | null) => void;
}

export function RegisterFormUser({ setIsAuth, setUserType }: RegisterFormProps) {
  const [formData, setFormData] = useState({
  nombre_completo: '',
  email: '',
  telefono: '', // Asegúrate que es string vacío
  password: '',
  confirmPassword: ''
});

  const [validation, setValidation] = useState({
    nombre_completo: { valid: false, message: '' },
    email: { valid: false, message: '' },
    telefono: { valid: true, message: '' },
    password: { valid: false, message: '' },
    confirmPassword: { valid: false, message: '' }
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [serverStatus, setServerStatus] = useState<'checking'|'healthy'|'unhealthy'>('checking');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Validaciones en tiempo real
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password));

    const validations = {
      nombre_completo: {
        test: () => validateUserName(formData.nombre_completo),
        message: 'Nombre completo inválido (3-50 caracteres, solo letras y espacios)'
      },
      email: {
        test: () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
        message: 'Email inválido'
      },
      telefono: {
        test: () => formData.telefono === '' || validatePhone(formData.telefono),
        message: 'Teléfono inválido (ej: +1234567890)'
      },
      password: {
        test: () => {
          const result = validatePassword(formData.password);
          return result.valid;
        },
        message: validatePassword(formData.password).message
      },
      confirmPassword: {
        test: () => formData.password === formData.confirmPassword && 
                   formData.password !== '',
        message: 'Las contraseñas no coinciden'
      }
    };

    Object.entries(validations).forEach(([field, { test, message }]) => {
      if (formData[field as keyof typeof formData] || field === 'confirmPassword') {
        setValidation(prev => ({
          ...prev,
          [field]: {
            valid: test(),
            message: test() ? '' : message
          }
        }));
      }
    });
  }, [formData]);

  // Verificación del servidor
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/health');
        const data = await response.json();
        setServerStatus(data.status === 'ok' ? 'healthy' : 'unhealthy');
      } catch {
        setServerStatus('unhealthy');
      }
    };
    checkServer();
  }, []);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  
  // Sanitización especial para teléfono
  const sanitizedValue = name === 'telefono' 
    ? value.replace(/[^\d+()\s-]/g, '') // Permite números, +, (), - y espacios
    : sanitizeInput(value);

  setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
  setError('');
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Datos del formulario:', {
    ...formData,
    telefono: formData.telefono || null // Convertir vacío a null
  });
    
    try {
      // Validación final antes de enviar
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'telefono' && !value) {
          throw new Error('Todos los campos obligatorios deben completarse');
        }
      });

      setIsSubmitting(true);
      setError('');

     const response = await fetch('http://localhost:3001/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre_completo: formData.nombre_completo,
    email: formData.email,
    telefono: formData.telefono || null,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    id_compania: 1 // O el valor adecuado para tu caso
  })
});

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en el registro');
      }

      setSuccessMessage('¡Registro exitoso! Redirigiendo...');
      setTimeout(() => {
        setIsAuth(true);
        setUserType('user');
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? 
        err.message.replace(/<\/?[^>]+(>|$)/g, "") : 
        'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.entries(validation)
    .filter(([key]) => key !== 'telefono')
    .every(([_, { valid }]) => valid);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro de Usuario</h2>
      
      {/* Estado del servidor */}
      <div className={`mb-4 p-2 rounded text-sm ${
        serverStatus === 'healthy' ? 'bg-green-100 text-green-800' :
        serverStatus === 'unhealthy' ? 'bg-red-100 text-red-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        {serverStatus === 'healthy' ? (
          <span className="flex items-center">
            <CheckCircle className="mr-2" /> Servidor disponible
          </span>
        ) : serverStatus === 'unhealthy' ? (
          <span className="flex items-center">
            <XCircle className="mr-2" /> No se puede conectar al servidor
          </span>
        ) : (
          'Verificando estado del servidor...'
        )}
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded text-sm">
          {error.includes('no permitidos') ? (
            <>
              <strong>¡Error de seguridad!</strong>
              <p className="mt-1">Hemos detectado caracteres no permitidos.</p>
            </>
          ) : (
            error
          )}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded text-sm">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Nombre Completo */}
        <div>
          <label className="block text-sm font-medium mb-1">Nombre Completo *</label>
          <div className="relative">
            <input
              type="text"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validation.nombre_completo.valid ? 'border-green-500' :
                formData.nombre_completo ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              minLength={3}
              maxLength={50}
              pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
              title="Solo letras y espacios (3-50 caracteres)"
            />
            <UserIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
          {!validation.nombre_completo.valid && formData.nombre_completo && (
            <p className="text-red-500 text-xs mt-1">{validation.nombre_completo.message}</p>
          )}
        </div>

        {/* Campo Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validation.email.valid ? 'border-green-500' :
                formData.email ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              inputMode="email"
              autoComplete="email"
            />
            <MailIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
          {!validation.email.valid && formData.email && (
            <p className="text-red-500 text-xs mt-1">{validation.email.message}</p>
          )}
        </div>

        {/* Campo Teléfono */}
        <div>
          <label className="block text-sm font-medium mb-1">Teléfono</label>
          <div className="relative">
            <input
  type="tel"
  name="telefono"
  value={formData.telefono}
  onChange={handleChange}
  className={`w-full p-2 border rounded ${
    validation.telefono.valid ? 'border-gray-300' : 'border-red-500'
  }`}
  pattern="^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.\/0-9]{7,15}$"
  title="Ejemplos válidos: +51987654321, (01)9876543, 987-654-321"
/>
            <PhoneIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
          {!validation.telefono.valid && formData.telefono && (
            <p className="text-red-500 text-xs mt-1">{validation.telefono.message}</p>
          )}
        </div>

        {/* Campo Contraseña */}
        <div>
          <label className="block text-sm font-medium mb-1">Contraseña *</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validation.password.valid ? 'border-green-500' :
                formData.password ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              minLength={12}
              maxLength={64}
              autoComplete="new-password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$"
            />
            <LockIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
          {!validation.password.valid && formData.password && (
            <p className="text-red-500 text-xs mt-1">{validation.password.message}</p>
          )}
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full" 
                style={{
                  width: `${passwordStrength}%`,
                  backgroundColor: passwordStrength < 40 ? '#ef4444' : 
                                  passwordStrength < 70 ? '#f59e0b' : '#10b981'
                }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Seguridad: {passwordStrength < 40 ? 'Débil' : 
                         passwordStrength < 70 ? 'Moderada' : 'Fuerte'}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <p className="font-medium">La contraseña debe contener:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li className={formData.password.length >= 12 ? 'text-green-500' : ''}>
                Mínimo 12 caracteres
              </li>
              <li className={/[A-Z]/.test(formData.password) ? 'text-green-500' : ''}>
                Al menos 1 letra mayúscula
              </li>
              <li className={/[a-z]/.test(formData.password) ? 'text-green-500' : ''}>
                Al menos 1 letra minúscula
              </li>
              <li className={/[0-9]/.test(formData.password) ? 'text-green-500' : ''}>
                Al menos 1 número
              </li>
              <li className={/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-500' : ''}>
                Al menos 1 carácter especial
              </li>
            </ul>
          </div>
        </div>

        {/* Campo Confirmar Contraseña */}
        <div>
          <label className="block text-sm font-medium mb-1">Confirmar Contraseña *</label>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validation.confirmPassword.valid ? 'border-green-500' :
                formData.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              minLength={12}
            />
            <LockIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
          {!validation.confirmPassword.valid && formData.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{validation.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting || serverStatus !== 'healthy'}
          className={`w-full py-2 px-4 rounded text-white font-medium ${
            (!isFormValid || serverStatus !== 'healthy') ? 'bg-gray-400 cursor-not-allowed' :
            'bg-blue-600 hover:bg-blue-700 transition-colors'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registrando...
            </span>
          ) : 'Registrarse'}
        </button>

        <div className="text-center text-sm pt-2">
          <p>
            ¿Ya tienes cuenta?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/user-auth/login')}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}