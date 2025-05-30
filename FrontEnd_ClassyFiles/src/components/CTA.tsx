import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
export function CTA() {
  return <section className="py-20 bg-[#14263C] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para Optimizar tu Gestión de Investigación?
          </h2>
          <p className="text-xl mb-8">
            Únete a las más de 500 instituciones en América Latina que ya están
            optimizando sus flujos de trabajo de proyectos científicos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#D18E41] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center">
              Programar Demo <ArrowRightIcon size={20} className="ml-2" />
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors">
              Descargar Folleto
            </button>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-[#D18E41]">30%</h3>
              <p className="text-sm">Tiempo Ahorrado</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-[#D18E41]">500+</h3>
              <p className="text-sm">Instituciones Objetivo</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-[#D18E41]">18</h3>
              <p className="text-sm">Meses ROI</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-[#D18E41]">100%</h3>
              <p className="text-sm">Adaptación Local</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}