import React from 'react';
import { FileTextIcon, UploadIcon, HomeIcon, CheckCircleIcon } from 'lucide-react';
export function Header({
  onViewChange,
  currentView
}) {
  return <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <FileTextIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                SciPaper
              </span>
            </div>
          </div>
          <nav className="flex space-x-4 items-center">
            <button onClick={() => onViewChange('dashboard')} className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${currentView === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
              <HomeIcon className="mr-1 h-5 w-5" />
              Inicio
            </button>
            <button onClick={() => onViewChange('upload')} className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${currentView === 'upload' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
              <UploadIcon className="mr-1 h-5 w-5" />
              Subir Paper
            </button>
            <button className="ml-3 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 flex items-center">
              <CheckCircleIcon className="mr-1 h-5 w-5" />
              Verificar
            </button>
          </nav>
        </div>
      </div>
    </header>;
}