import React from 'react';
export function Footer() {
  return <footer className="bg-[#0A0A0C] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-[#D18E41]">Cassy</span>
              <span className="text-2xl font-bold text-white">Files</span>
            </div>
            <p className="text-[#BEBEBE] max-w-xs">
              Optimizando la gestión de proyectos científicos para instituciones
              en toda América Latina.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#D18E41]">
                Producto
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
                    Funciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
                    Casos de Éxito
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
                    Documentación
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#D18E41]">Empresa</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
                    Equipo
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
                    Carreras
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#D18E41]">
                Recursos
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
                    Soporte
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
                    Aliados
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
                    Política de Privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#BEBEBE] mb-4 md:mb-0">
            © 2023 CassyFiles. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-[#BEBEBE] hover:text-white transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>;
}