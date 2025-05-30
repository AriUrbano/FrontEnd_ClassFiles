import React, { useState } from 'react';
import { UserIcon, MailIcon, GraduationCapIcon, BuildingIcon } from 'lucide-react';
export function RegisterIndividual() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
    institution: ''
  });
  const specialties = ['Medicina', 'Biología', 'Química', 'Física', 'Ingeniería', 'Otros'];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Individual registration data:', formData);
  };
  return <div className="min-h-screen bg-[#FFF6F1] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold text-[#D18E41]">Cassy</span>
            <span className="text-2xl font-bold text-[#14263C]">Files</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#14263C]">
            Registro Individual
          </h2>
          <p className="mt-2 text-sm text-[#BEBEBE]">
            Para investigadores y revisores
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#14263C]">
                Nombre Completo
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-[#BEBEBE]" />
                </div>
                <input id="name" name="name" type="text" required className="appearance-none block w-full pl-10 pr-3 py-2 border border-[#BEBEBE] rounded-md shadow-sm placeholder-[#BEBEBE] focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41]" placeholder="Juan Pérez" value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} />
              </div>
            </div>
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
              <label htmlFor="specialty" className="block text-sm font-medium text-[#14263C]">
                Especialidad
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GraduationCapIcon className="h-5 w-5 text-[#BEBEBE]" />
                </div>
                <select id="specialty" name="specialty" required className="appearance-none block w-full pl-10 pr-3 py-2 border border-[#BEBEBE] rounded-md shadow-sm focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41]" value={formData.specialty} onChange={e => setFormData({
                ...formData,
                specialty: e.target.value
              })}>
                  <option value="">Seleccione una especialidad</option>
                  {specialties.map(specialty => <option key={specialty} value={specialty}>
                      {specialty}
                    </option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-[#14263C]">
                Institución
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BuildingIcon className="h-5 w-5 text-[#BEBEBE]" />
                </div>
                <input id="institution" name="institution" type="text" required className="appearance-none block w-full pl-10 pr-3 py-2 border border-[#BEBEBE] rounded-md shadow-sm placeholder-[#BEBEBE] focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41]" placeholder="Nombre de la institución" value={formData.institution} onChange={e => setFormData({
                ...formData,
                institution: e.target.value
              })} />
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#14263C] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D18E41]">
              Registrarse
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-[#14263C]">
              ¿Ya tienes una cuenta?{' '}
              <a href="#" className="font-medium text-[#D18E41] hover:text-opacity-90">
                Iniciar sesión
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>;
}