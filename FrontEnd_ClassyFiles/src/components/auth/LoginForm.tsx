import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from 'lucide-react';
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
  };
  return <div className="min-h-screen bg-[#FFF6F1] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold text-[#D18E41]">Cassy</span>
            <span className="text-2xl font-bold text-[#14263C]">Files</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#14263C]">
            Iniciar Sesión
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#14263C]">
                Correo Electrónico
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-[#BEBEBE]" />
                </div>
                <input id="email" name="email" type="email" required className="appearance-none block w-full pl-10 pr-3 py-2 border border-[#BEBEBE] rounded-md shadow-sm placeholder-[#BEBEBE] focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41]" placeholder="nombre@ejemplo.com" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#14263C]">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-[#BEBEBE]" />
                </div>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} required className="appearance-none block w-full pl-10 pr-10 py-2 border border-[#BEBEBE] rounded-md shadow-sm placeholder-[#BEBEBE] focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41]" placeholder="••••••••" value={formData.password} onChange={e => setFormData({
                ...formData,
                password: e.target.value
              })} />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOffIcon className="h-5 w-5 text-[#BEBEBE]" /> : <EyeIcon className="h-5 w-5 text-[#BEBEBE]" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#D18E41] focus:ring-[#D18E41] border-[#BEBEBE] rounded" checked={formData.rememberMe} onChange={e => setFormData({
                ...formData,
                rememberMe: e.target.checked
              })} />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#14263C]">
                  Recordarme
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-[#D18E41] hover:text-opacity-90">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#14263C] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D18E41]">
              Ingresar
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-[#14263C]">
              ¿No tienes una cuenta?{' '}
              <a href="#" className="font-medium text-[#D18E41] hover:text-opacity-90">
                Registrar nueva cuenta
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>;
}