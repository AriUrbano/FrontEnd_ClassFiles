import React from 'react';
import { ServerIcon, PaintbrushIcon, BarChartIcon } from 'lucide-react';
export function Solution() {
  return <section id="solution" className="py-20 bg-[#FFF6F1]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#14263C]">
            Nuestra Solución
          </h2>
          <p className="text-xl text-[#0A0A0C] max-w-3xl mx-auto">
            CassyFiles es una plataforma todo en uno diseñada específicamente
            para instituciones científicas.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="md:w-1/2">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="CassyFiles platform" className="rounded-lg shadow-lg w-full" />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4 text-[#14263C]">
              Key Features
            </h3>
            <div className="mb-6">
              <div className="flex items-start mb-2">
                <div className="bg-[#14263C] w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <ServerIcon size={16} className="text-[#D18E41]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#14263C]">
                    Gestión Centralizada
                  </h4>
                  <p className="text-[#0A0A0C]">
                    Carga, revisa y financia proyectos en una plataforma segura
                    con trazabilidad completa.
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start mb-2">
                <div className="bg-[#14263C] w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <PaintbrushIcon size={16} className="text-[#D18E41]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#14263C]">
                    Solución White-Label
                  </h4>
                  <p className="text-[#0A0A0C]">
                    Totalmente personalizable para adaptarse a la marca y
                    requisitos específicos de su institución.
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-start mb-2">
                <div className="bg-[#14263C] w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <BarChartIcon size={16} className="text-[#D18E41]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#14263C]">
                    Paneles en Tiempo Real
                  </h4>
                  <p className="text-[#0A0A0C]">
                    Análisis y reportes completos para seguir el progreso del
                    proyecto y la asignación de recursos.
                  </p>
                </div>
              </div>
            </div>
            <button className="bg-[#D18E41] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors mt-4">
              Explorar Todas las Funciones
            </button>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-[#14263C] text-center">
            Módulo de Patentes
          </h3>
          <p className="text-center mb-8 text-[#0A0A0C]">
            Nuestro módulo especializado de gestión de patentes ayuda a las
            instituciones a proteger su propiedad intelectual y agilizar el
            proceso de solicitud de patentes.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border-l-4 border-[#D18E41]">
              <h4 className="font-bold text-[#14263C]">Patent Tracking</h4>
              <p className="text-[#0A0A0C]">
                Monitor patent applications from submission to approval.
              </p>
            </div>
            <div className="p-4 border-l-4 border-[#D18E41]">
              <h4 className="font-bold text-[#14263C]">IP Protection</h4>
              <p className="text-[#0A0A0C]">
                Secure storage of sensitive intellectual property documents.
              </p>
            </div>
            <div className="p-4 border-l-4 border-[#D18E41]">
              <h4 className="font-bold text-[#14263C]">Compliance</h4>
              <p className="text-[#0A0A0C]">
                Adapted to local regulations like ANMAT and CONICET
                requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}