import React from 'react';
import { ClockIcon, FileWarningIcon, BanknoteIcon } from 'lucide-react';
export function Problem() {
  return <section id="problem" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#14263C]">
            El Problema que Resolvemos
          </h2>
          <p className="text-xl text-[#0A0A0C] max-w-3xl mx-auto">
            Las instituciones científicas pierden más del 30% de su tiempo
            gestionando proyectos con herramientas obsoletas como correos
            electrónicos y hojas de cálculo.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#FFF6F1] p-8 rounded-lg shadow-md">
            <div className="bg-[#14263C] w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <ClockIcon size={24} className="text-[#D18E41]" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#14263C]">
              Falta de Trazabilidad
            </h3>
            <p className="text-[#0A0A0C]">
              Las evaluaciones se pierden en hilos de correo y unidades
              compartidas, dificultando el seguimiento del progreso y las
              decisiones.
            </p>
          </div>
          <div className="bg-[#FFF6F1] p-8 rounded-lg shadow-md">
            <div className="bg-[#14263C] w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <FileWarningIcon size={24} className="text-[#D18E41]" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#14263C]">
              Riesgo de Pérdida de Datos
            </h3>
            <p className="text-[#0A0A0C]">
              Los datos cruciales de investigación y evaluaciones son
              vulnerables a pérdidas cuando se almacenan en sistemas
              fragmentados.
            </p>
          </div>
          <div className="bg-[#FFF6F1] p-8 rounded-lg shadow-md">
            <div className="bg-[#14263C] w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <BanknoteIcon size={24} className="text-[#D18E41]" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#14263C]">
              Retrasos en Financiamiento
            </h3>
            <p className="text-[#0A0A0C]">
              Las ineficiencias administrativas conducen a retrasos
              significativos en la obtención y distribución del financiamiento
              de investigación.
            </p>
          </div>
        </div>
        <div className="mt-12 p-6 bg-[#14263C] rounded-lg text-white">
          <p className="text-center font-medium">
            Según la OCDE (2021), las instituciones de investigación pierden
            tiempo y recursos valiosos debido a procesos ineficientes de gestión
            de proyectos.
          </p>
        </div>
      </div>
    </section>;
}