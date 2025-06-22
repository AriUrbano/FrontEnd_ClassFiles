import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuildingIcon, MailIcon, PhoneIcon, BriefcaseIcon, LockIcon, CheckCircle, XCircle } from 'lucide-react';

interface RegisterFormProps {
  setIsAuth: (value: boolean) => void;
  setUserType: (type: 'user' | 'company' | null) => void;
}

export function RegisterFormCompany({ setIsAuth, setUserType }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    nombre: '', // Cambiado de nombre_empresa a nombre para coincidir con la DB
    correo: '', // Cambiado de email a correo para coincidir con la DB
    telefono: '',
    industria: '',
    password: '',
    confirmPassword: '' // Cambiado de confirmar_password a confirmPassword
  });

  const [validation, setValidation] = useState({
    nombre: { valid: false, message: '' },
    correo: { valid: false, message: '' },
    industria: { valid: false, message: '' },
    password: { valid: false, message: '' },
    confirmPassword: { valid: false, message: '' }
  });

  const [serverStatus, setServerStatus] = useState<'checking'|'healthy'|'unhealthy'>('checking');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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

    validateField('nombre', () => {
      const valid = formData.nombre.length >= 3;
      return { valid, message: valid ? '' : 'Mínimo 3 caracteres' };
    });

    validateField('correo', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const valid = emailRegex.test(formData.correo);
      return { valid, message: valid ? '' : 'Correo inválido' };
    });

    validateField('industria', () => {
      const valid = formData.industria !== '';
      return { valid, message: valid ? '' : 'Selecciona una industria' };
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
      const response = await fetch('http://localhost:3001/api/auth/company/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          correo: formData.correo,
          telefono: formData.telefono,
          industria: formData.industria,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
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
        throw new Error(data.error || 'Error en el registro');
      }

      // Registro exitoso - muestra mensaje y redirige al login
      setSuccessMessage('¡Registro exitoso! Redirigiendo al login...');
      setTimeout(() => {
        navigate('/company-auth/login');
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? 
        err.message : 
        'Error desconocido durante el registro');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchToLogin = () => {
    navigate('/company-auth/login');
  };

  const isFormValid = Object.values(validation).every(f => f.valid);

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
          <label className="block text-sm font-medium mb-1">Nombre de la Empresa *</label>
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
              placeholder="Mi Empresa S.A."
            />
            <BuildingIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
          {!validation.nombre.valid && formData.nombre && (
            <p className="text-red-500 text-xs mt-1">{validation.nombre.message}</p>
          )}
        </div>

        {/* Campo Correo Electrónico */}
        <div>
          <label className="block text-sm font-medium mb-1">Correo Electrónico *</label>
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
              placeholder="empresa@ejemplo.com"
            />
            <MailIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
          {!validation.correo.valid && formData.correo && (
            <p className="text-red-500 text-xs mt-1">{validation.correo.message}</p>
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
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="+54 11 1234-5678"
            />
            <PhoneIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
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
              <option value="">Selecciona una industria</option>
              <option value="tecnologia">Tecnología</option>
              <option value="manufactura">Manufactura</option>
              <option value="servicios">Servicios</option>
              <option value="comercio">Comercio</option>
              <option value="otro">Otro</option>
            </select>
            <BriefcaseIcon className="absolute right-3 top-3 text-gray-400" />
          </div>
          {!validation.industria.valid && formData.industria && (
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
              minLength={8}
              placeholder="Mínimo 8 caracteres"
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
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                validation.confirmPassword.valid ? 'border-green-500' :
                formData.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              required
              placeholder="Repite tu contraseña"
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
            'bg-[#14263C] hover:bg-opacity-90'
          }`}
        >
          {isSubmitting ? 'Registrando empresa...' : 'Registrar Empresa'}
        </button>

        <div className="text-center text-sm pt-2">
          <p>
            ¿Ya tienes cuenta empresarial?{' '}
            <button 
              type="button" 
              onClick={handleSwitchToLogin}
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