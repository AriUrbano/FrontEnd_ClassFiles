import React, { useState } from 'react';
import { BuildingIcon, MailIcon, CreditCardIcon } from 'lucide-react';
export function RegisterCompany() {
  const [formData, setFormData] = useState({
    legalName: '',
    taxId: '',
    email: '',
    plan: 'basic'
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Company registration data:', formData);
  };
  return <div className="min-h-screen bg-[#FFF6F1] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold text-[#D18E41]">Cassy</span>
            <span className="text-2xl font-bold text-[#14263C]">Files</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#14263C]">
            Registro de Empresa
          </h2>
          <p className="mt-2 text-sm text-[#BEBEBE]">
            Complete los datos de su institución
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="legalName" className="block text-sm font-medium text-[#14263C]">
                Nombre Legal
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BuildingIcon className="h-5 w-5 text-[#BEBEBE]" />
                </div>
                <input id="legalName" name="legalName" type="text" required className="appearance-none block w-full pl-10 pr-3 py-2 border border-[#BEBEBE] rounded-md shadow-sm placeholder-[#BEBEBE] focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41]" placeholder="Nombre de la empresa" value={formData.legalName} onChange={e => setFormData({
                ...formData,
                legalName: e.target.value
              })} />
              </div>
            </div>
            <div>
              <label htmlFor="taxId" className="block text-sm font-medium text-[#14263C]">
                RUT/CUIT
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCardIcon className="h-5 w-5 text-[#BEBEBE]" />
                </div>
                <input id="taxId" name="taxId" type="text" required className="appearance-none block w-full pl-10 pr-3 py-2 border border-[#BEBEBE] rounded-md shadow-sm placeholder-[#BEBEBE] focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41]" placeholder="XX-XXXXXXXX-X" value={formData.taxId} onChange={e => setFormData({
                ...formData,
                taxId: e.target.value
              })} />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#14263C]">
                Dominio de Email Corporativo
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-[#BEBEBE]" />
                </div>
                <input id="email" name="email" type="text" required className="appearance-none block w-full pl-10 pr-3 py-2 border border-[#BEBEBE] rounded-md shadow-sm placeholder-[#BEBEBE] focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41]" placeholder="@empresa.com" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} />
              </div>
            </div>
            <div>
              <label htmlFor="plan" className="block text-sm font-medium text-[#14263C]">
                Plan
              </label>
              <select id="plan" name="plan" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-[#BEBEBE] focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41] rounded-md" value={formData.plan} onChange={e => setFormData({
              ...formData,
              plan: e.target.value
            })}>
                <option value="basic">Básico</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#14263C] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D18E41]">
              Registrar Empresa
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