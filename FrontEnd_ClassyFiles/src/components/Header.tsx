import React, { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="bg-[#14263C] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-[#D18E41]">Cassy</span>
          <span className="text-2xl font-bold text-white">Files</span>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#problem" className="hover:text-[#D18E41] transition-colors">
            Problema
          </a>
          <a href="#solution" className="hover:text-[#D18E41] transition-colors">
            Solución
          </a>
          <a href="#market" className="hover:text-[#D18E41] transition-colors">
            Mercado
          </a>
          <a href="#pricing" className="hover:text-[#D18E41] transition-colors">
            Precios
          </a>
          <button className="bg-[#D18E41] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
            Contáctanos
          </button>
        </nav>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && <nav className="md:hidden bg-[#14263C] px-4 py-4 flex flex-col space-y-4">
          <a href="#problem" className="hover:text-[#D18E41] transition-colors" onClick={() => setIsMenuOpen(false)}>
            Problema
          </a>
          <a href="#solution" className="hover:text-[#D18E41] transition-colors" onClick={() => setIsMenuOpen(false)}>
            Solución
          </a>
          <a href="#market" className="hover:text-[#D18E41] transition-colors" onClick={() => setIsMenuOpen(false)}>
            Mercado
          </a>
          <a href="#pricing" className="hover:text-[#D18E41] transition-colors" onClick={() => setIsMenuOpen(false)}>
            Precios
          </a>
          <button className="bg-[#D18E41] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors w-full">
            Contáctanos
          </button>
        </nav>}
    </header>;
}