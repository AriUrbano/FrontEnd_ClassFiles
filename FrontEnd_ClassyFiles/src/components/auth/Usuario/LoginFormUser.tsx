import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MailIcon, LockIcon, CheckCircle, XCircle } from 'lucide-react';


export function LoginFormUser({ setIsAuth, setUserType }: { setIsAuth: (value: boolean) => void, setUserType: (value: 'user' | 'company' | null) => void }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [validation, setValidation] = useState({
    email: { valid: false, message: '' },
    password: { valid: false, message: '' }
  });

  const [serverStatus, setServerStatus] = useState<'checking'|'healthy'|'unhealthy'>('checking');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Validaciones en tiempo real
  useEffect(() => {
    const validateField = (name: string, validator: () => { valid: boolean; message: string }) => {
      if (formData[name as keyof typeof formData]) {
        const result = validator();
        setValidation(prev => ({ ...prev, [name]: result }));
      }
    };

    validateField('email', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const valid = emailRegex.test(formData.email);
      return { valid, message: valid ? '' : 'Email inválido' };
    });

    validateField('password', () => {
      const valid = formData.password.length >= 8;
      return { valid, message: valid ? '' : 'Mínimo 8 caracteres' };
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

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Manejo de respuestas no JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(text.startsWith('<!') ? 
          'Error en el servidor (respuesta no JSON)' : 
          text);
      }

      const data = await response.json();

       if (!response.ok) {
        throw new Error(data.error || 'Error en el inicio de sesión');
      }

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userType', 'user');
      setIsAuth(true);
      setUserType('user');
      navigate('/dashboard'); // Redirige al dashboard después del login
      
    } catch (err) {
      setError(err instanceof Error ? 
        err.message : 
        'Error desconocido durante el inicio de sesión');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.values(validation).every(f => f.valid);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      
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

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="flex justify-end">
          <button 
            type="button" 
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting || serverStatus !== 'healthy'}
          className={`w-full py-2 px-4 rounded text-white font-medium ${
            (!isFormValid || serverStatus !== 'healthy') ? 'bg-gray-400' :
            'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>

       <div className="text-center text-sm pt-2">
        <p>
          ¿No tienes cuenta?{' '}
          <button 
            type="button" 
            onClick={() => navigate('/user-auth/register')} // Ruta corregida
            className="text-blue-600 hover:underline"
          >
            Regístrate
          </button>
        </p>
      </div>

      </form>
    </div>
  );
}