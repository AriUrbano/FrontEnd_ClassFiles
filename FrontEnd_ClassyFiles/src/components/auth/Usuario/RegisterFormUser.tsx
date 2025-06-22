import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockIcon, MailIcon, UserIcon, PhoneIcon, CheckCircle, XCircle } from 'lucide-react';

export function RegisterFormUser({ setIsAuth, setUserType }: { setIsAuth: (value: boolean) => void, setUserType: (value: 'user' | 'company' | null) => void }) {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });

  const [validation, setValidation] = useState({
    nombre_completo: { valid: false, message: '' },
    email: { valid: false, message: '' },
    password: { valid: false, message: '' },
    confirmPassword: { valid: false, message: '' }
  });
const [successMessage, setSuccessMessage] = useState('');

  const [serverStatus, setServerStatus] = useState<'checking'|'healthy'|'unhealthy'>('checking');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Validaciones en tiempo real (mantenemos igual)
  useEffect(() => {
    const validateField = (name: string, validator: () => { valid: boolean; message: string }) => {
      if (formData[name as keyof typeof formData]) {
        const result = validator();
        setValidation(prev => ({ ...prev, [name]: result }));
      }
    };

    validateField('nombre_completo', () => {
      const valid = formData.nombre_completo.length >= 3;
      return { valid, message: valid ? '' : 'Mínimo 3 caracteres' };
    });

    validateField('email', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const valid = emailRegex.test(formData.email);
      return { valid, message: valid ? '' : 'Email inválido' };
    });

    validateField('password', () => {
      const valid = formData.password.length >= 8 && 
                   /[A-Z]/.test(formData.password) && 
                   /[0-9]/.test(formData.password);
      return { valid, message: valid ? '' : 'Mínimo 8 caracteres, 1 mayúscula y 1 número' };
    });

    validateField('confirmPassword', () => {
      const valid = formData.password === formData.confirmPassword && 
                   formData.password !== '';
      return { valid, message: valid ? '' : 'Las contraseñas no coinciden' };
    });
  }, [formData]);

  // Verificación del servidor con URL corregida
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

  const API_BASE_URL = 'http://localhost:3001/api/auth';

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_completo: formData.nombre_completo,
          email: formData.email,
          telefono: formData.telefono,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      });

      // Manejo especial para respuestas no JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(text.startsWith('<!') ? 
          'Error en el servidor (respuesta no JSON)' : 
          text);
      }

      const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Error en el registro');
      }

      // Registro exitoso - muestra mensaje y redirige al login
      setSuccessMessage('¡Registro exitoso! Redirigiendo al login...');
setTimeout(() => {
  navigate('/user-auth/login');
}, 2000);

    } catch (err) {
      setError(err instanceof Error ? 
        err.message : 
        'Error desconocido durante el registro');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.values(validation).every(f => f.valid);

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
          {error}
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
              onChange={(e) => setFormData({...formData, nombre_completo: e.target.value})}
              className={`w-full p-2 border rounded ${
                validation.nombre_completo.valid ? 'border-green-500' :
                formData.nombre_completo ? 'border-red-500' : 'border-gray-300'
              }`}
              required
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
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full p-2 border rounded ${
                validation.email.valid ? 'border-green-500' :
                formData.email ? 'border-red-500' : 'border-gray-300'
              }`}
              required
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
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <PhoneIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Campo Contraseña */}
        <div>
          <label className="block text-sm font-medium mb-1">Contraseña *</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={`w-full p-2 border rounded ${
                validation.password.valid ? 'border-green-500' :
                formData.password ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            <LockIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
          {!validation.password.valid && formData.password && (
            <p className="text-red-500 text-xs mt-1">{validation.password.message}</p>
          )}
        </div>

        {/* Campo Confirmar Contraseña */}
        <div>
          <label className="block text-sm font-medium mb-1">Confirmar Contraseña *</label>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className={`w-full p-2 border rounded ${
                validation.confirmPassword.valid ? 'border-green-500' :
                formData.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              required
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
            (!isFormValid || serverStatus !== 'healthy') ? 'bg-gray-400' :
            'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Registrando...' : 'Registrarse'}
        </button>

        <div className="text-center text-sm pt-2">
        <p>
          ¿Ya tienes cuenta?{' '}
          <button 
            type="button" 
            onClick={() => navigate('/user-auth/login')} // Ruta corregida
            className="text-blue-600 hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      </div>

      </form>
    </div>
  );
}