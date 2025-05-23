import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
export function Hero() {
  return <section className="bg-[#14263C] text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Optimiza la Gestión de Proyectos Científicos
            </h1>
            <p className="text-xl mb-8 text-[#BEBEBE]">
              CassyFiles centraliza la carga, revisión y financiamiento de
              proyectos científicos para instituciones, ahorrando 30% del tiempo
              perdido en herramientas obsoletas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#D18E41] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center">
                Solicitar Demo <ArrowRightIcon size={20} className="ml-2" />
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors">
                Conocer Más
              </button>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <div className="bg-[#0A0A0C] p-2 rounded-lg shadow-xl">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="CassyFiles platform dashboard" className="rounded-lg w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>;
}