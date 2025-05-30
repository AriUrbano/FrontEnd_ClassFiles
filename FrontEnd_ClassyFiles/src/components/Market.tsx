import React from 'react';
import { BuildingIcon, GraduationCapIcon, HeartPulseIcon, FlaskConicalIcon } from 'lucide-react';
export function Market() {
  return <section id="market" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#14263C]">
            Mercado Objetivo
          </h2>
          <p className="text-xl text-[#0A0A0C] max-w-3xl mx-auto">
            CassyFiles atiende a más de 500 instituciones en América Latina con
            necesidades especializadas de gestión de investigación.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-[#FFF6F1] p-6 rounded-lg text-center">
            <div className="bg-[#14263C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCapIcon size={32} className="text-[#D18E41]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#14263C]">
              Universidades
            </h3>
            <p className="text-[#0A0A0C]">
              Departamentos de investigación que gestionan múltiples solicitudes
              de subvenciones y proyectos estudiantiles.
            </p>
          </div>
          <div className="bg-[#FFF6F1] p-6 rounded-lg text-center">
            <div className="bg-[#14263C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartPulseIcon size={32} className="text-[#D18E41]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#14263C]">
              Hospitales
            </h3>
            <p className="text-[#0A0A0C]">
              Centros de investigación clínica que coordinan ensayos y proyectos
              de innovación médica.
            </p>
          </div>
          <div className="bg-[#FFF6F1] p-6 rounded-lg text-center">
            <div className="bg-[#14263C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FlaskConicalIcon size={32} className="text-[#D18E41]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#14263C]">
              Empresas de I+D
            </h3>
            <p className="text-[#0A0A0C]">
              Organizaciones privadas de investigación que desarrollan nuevos
              productos y tecnologías.
            </p>
          </div>
          <div className="bg-[#FFF6F1] p-6 rounded-lg text-center">
            <div className="bg-[#14263C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BuildingIcon size={32} className="text-[#D18E41]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#14263C]">
              Agencias Gubernamentales
            </h3>
            <p className="text-[#0A0A0C]">
              Instituciones públicas que gestionan subvenciones científicas e
              iniciativas de investigación.
            </p>
          </div>
        </div>
        <div className="bg-[#14263C] text-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Nuestras Diferenciales
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-[#D18E41] pl-4">
              <h4 className="font-bold text-[#D18E41]">
                Solución Integrada Única en el Región
              </h4>
              <p>
                La única solución que combina la gestión de proyectos,
                evaluación y financiamiento en un sistema.
              </p>
            </div>
            <div className="border-l-4 border-[#D18E41] pl-4">
              <h4 className="font-bold text-[#D18E41]">Adaptada Localmente</h4>
              <p>
                Diseñada específicamente para instituciones latinoamericanas,
                cumpliendo con ANMAT, CONICET y otras regulaciones locales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}