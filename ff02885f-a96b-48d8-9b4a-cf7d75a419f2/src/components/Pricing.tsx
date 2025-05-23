import React from 'react';
import { CheckIcon } from 'lucide-react';
export function Pricing() {
  return <section id="pricing" className="py-20 bg-[#FFF6F1]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#14263C]">
            Modelo de Negocio
          </h2>
          <p className="text-xl text-[#0A0A0C] max-w-3xl mx-auto">
            Opciones flexibles diseñadas para satisfacer las necesidades de
            instituciones de todos los tamaños.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#14263C]">
                Suscripción Anual
              </h3>
              <div className="mt-4">
                <span className="text-3xl font-bold text-[#14263C]">
                  $15,000 - $50,000
                </span>
                <span className="text-[#0A0A0C]">/year</span>
              </div>
              <p className="mt-2 text-[#0A0A0C]">
                Escalado según el tamaño y necesidades de la institución
              </p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckIcon size={20} className="text-[#D18E41] mr-2 mt-1 flex-shrink-0" />
                <p>
                  Acceso completo a la plataforma con actualizaciones regulares
                </p>
              </div>
              <div className="flex items-start">
                <CheckIcon size={20} className="text-[#D18E41] mr-2 mt-1 flex-shrink-0" />
                <p>Alojamiento en la nube y soporte técnico</p>
              </div>
              <div className="flex items-start">
                <CheckIcon size={20} className="text-[#D18E41] mr-2 mt-1 flex-shrink-0" />
                <p>Panel de administración y análisis</p>
              </div>
              <div className="flex items-start">
                <CheckIcon size={20} className="text-[#D18E41] mr-2 mt-1 flex-shrink-0" />
                <p>Opciones básicas de personalización</p>
              </div>
            </div>
            <button className="w-full bg-[#14263C] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors">
              Solicitar Precios
            </button>
          </div>
          <div className="bg-[#14263C] p-8 rounded-lg shadow-md text-white">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                Solución White-Label
              </h3>
              <div className="mt-4">
                <span className="text-3xl font-bold text-[#D18E41]">
                  $100,000 - $300,000
                </span>
                <span className="text-white">/one-time</span>
              </div>
              <p className="mt-2 text-white">Más mantenimiento anual</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckIcon size={20} className="text-[#D18E41] mr-2 mt-1 flex-shrink-0" />
                <p>Totalmente personalizado para la marca de su institución</p>
              </div>
              <div className="flex items-start">
                <CheckIcon size={20} className="text-[#D18E41] mr-2 mt-1 flex-shrink-0" />
                <p>Opciones de alojamiento propio o en la nube</p>
              </div>
              <div className="flex items-start">
                <CheckIcon size={20} className="text-[#D18E41] mr-2 mt-1 flex-shrink-0" />
                <p>Desarrollo de funciones personalizadas</p>
              </div>
              <div className="flex items-start">
                <CheckIcon size={20} className="text-[#D18E41] mr-2 mt-1 flex-shrink-0" />
                <p>Equipo de soporte dedicado</p>
              </div>
              <div className="flex items-start">
                <CheckIcon size={20} className="text-[#D18E41] mr-2 mt-1 flex-shrink-0" />
                <p>Propiedad total de la implementación</p>
              </div>
            </div>
            <button className="w-full bg-[#D18E41] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors">
              Contactar Ventas
            </button>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-[#14263C] font-medium">
            Break-even en 18 meses con just 20 clientes
          </p>
        </div>
      </div>
    </section>;
}