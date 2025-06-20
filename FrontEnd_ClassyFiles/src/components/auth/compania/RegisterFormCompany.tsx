import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuildingIcon, MailIcon, PhoneIcon, BriefcaseIcon, LockIcon, CheckCircle, XCircle } from 'lucide-react';
import { 
  validatePassword, 
  sanitizeInput, 
  validateCompanyEmail,
  validateCompanyName,
  validatePhone,
  calculatePasswordStrength
} from '../../../utils/validation';

interface RegisterFormProps {
  setIsAuth: (value: boolean) => void;
  setUserType: (type: 'user' | 'company' | null) => void;
}

export function RegisterFormCompany({ setIsAuth, setUserType }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    industria: '',
    password: '',
    confirmPassword: ''
  });

  const [validation, setValidation] = useState({
    nombre: { valid: false, message: '' },
    correo: { valid: false, message: '' },
    telefono: { valid: true, message: '' },
    industria: { valid: false, message: '' },
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
      nombre: {
        test: () => validateCompanyName(formData.nombre),
        message: 'Nombre inválido (3-100 caracteres, solo letras, números y . , - &)'
      },
      correo: {
        test: () => {
          const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo);
          return emailValid && validateCompanyEmail(formData.correo);
        },
        message: validateCompanyEmail(formData.correo) ? 
                 'Email inválido' : 
                 'Debe usar un email corporativo (no @gmail, @yahoo, etc.)'
      },
      telefono: {
        test: () => formData.telefono === '' || validatePhone(formData.telefono),
        message: 'Teléfono inválido (ej: +1234567890)'
      },
      industria: {
        test: () => formData.industria !== '',
        message: 'Seleccione una industria'
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
      setValidation(prev => ({
        ...prev,
        [field]: {
          valid: test(),
          message: test() ? '' : message
        }
      }));
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    try {
      const sanitizedValue = name === 'telefono' 
        ? value.replace(/[^\d+()\s-]/g, '') // Sanitización especial para teléfono
        : sanitizeInput(value);
      
      setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
      setError('');
    } catch (err) {
      setError('Caracteres no permitidos detectados');
      setFormData(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validación mejorada de campos requeridos
      const requiredFields = ['nombre', 'correo', 'industria', 'password', 'confirmPassword'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData].trim());
      
      if (missingFields.length > 0) {
        throw new Error(`Complete los campos requeridos: ${missingFields.join(', ')}`);
      }

      // Validación de contraseñas coincidentes
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      setIsSubmitting(true);
      setError('');

      const response = await fetch('http://localhost:3001/api/auth/company/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Security-Check': 'true'
        },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          correo: formData.correo.trim(),
          telefono: formData.telefono.trim() || null,
          industria: formData.industria,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en el registro');
      }

      const responseData = await response.json();
      
     setSuccessMessage('¡Registro exitoso! Redirigiendo al login...');
      setTimeout(() => {
        navigate('/company-auth/login'); // Cambia esta línea
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
      <h2 className="text-2xl font-bold mb-6 text-center">Registro de Empresa</h2>
      
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
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded text-sm">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Nombre de Empresa */}
        <div>
          <label className="block text-sm font-medium mb-1">Nombre de Empresa *</label>
          <div className="relative">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validation.nombre.valid ? 'border-green-500' :
                formData.nombre ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              minLength={3}
              maxLength={100}
              pattern="^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s&.,-]+$"
              title="Solo letras, números y . , - &"
            />
            <BuildingIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
          {!validation.nombre.valid && formData.nombre && (
            <p className="text-red-500 text-xs mt-1">{validation.nombre.message}</p>
          )}
        </div>

        {/* Campo Email Corporativo */}
        <div>
          <label className="block text-sm font-medium mb-1">Email Corporativo *</label>
          <div className="relative">
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validation.correo.valid ? 'border-green-500' :
                formData.correo ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              placeholder="contacto@empresa.com"
            />
            <MailIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
          {!validation.correo.valid && formData.correo && (
            <p className="text-red-500 text-xs mt-1">
              {validation.correo.message.includes('corporativo') ? (
                <>
                  <span className="font-medium">Email no corporativo.</span> 
                  <br />Por favor use un email de su empresa (no @gmail, @yahoo, etc.)
                </>
              ) : (
                validation.correo.message
              )}
            </p>
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

        {/* Campo Industria */}
        <div>
          <label className="block text-sm font-medium mb-1">Industria *</label>
          <div className="relative">
            <select
              name="industria"
              value={formData.industria}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validation.industria.valid ? 'border-green-500' :
                formData.industria ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Seleccione una industria</option>
              <option value="tecnologia">Tecnología</option>
              <option value="manufactura">Manufactura</option>
              <option value="finanzas">Finanzas</option>
              <option value="salud">Salud</option>
              <option value="educacion">Educación</option>
              <option value="comercio">Comercio</option>
              <option value="otros">Otros</option>
            </select>
            <BriefcaseIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
          {!validation.industria.valid && (
            <p className="text-red-500 text-xs mt-1">{validation.industria.message}</p>
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
              Registrando empresa...
            </span>
          ) : 'Registrar Empresa'}
        </button>

        <div className="text-center text-sm pt-2">
          <p>
            ¿Ya tienes cuenta empresarial?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/company-auth/login')}
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