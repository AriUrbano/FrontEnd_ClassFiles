import React from 'react';
import { SearchIcon, FileTextIcon, ClockIcon, CheckCircleIcon, MessageCircleIcon } from 'lucide-react';
export function Dashboard({
  onPaperSelect,
  onFeedback
}) {
  // Mock data for papers
  const papers = [{
    id: 1,
    title: 'Avances en inteligencia artificial aplicada a la medicina',
    authors: 'García, M., López, J., Martínez, A.',
    journal: 'Journal of Medical AI',
    date: '15 Mayo, 2023',
    status: 'reviewed',
    feedbackCount: 3
  }, {
    id: 2,
    title: 'Nuevos métodos para el análisis de datos climáticos',
    authors: 'Rodríguez, P., Fernández, L.',
    journal: 'Climate Science Today',
    date: '2 Abril, 2023',
    status: 'pending',
    feedbackCount: 0
  }, {
    id: 3,
    title: 'El impacto de la microbiota intestinal en enfermedades neurodegenerativas',
    authors: 'Sánchez, E., Gómez, R., Pérez, T.',
    journal: 'Neurology Research',
    date: '28 Marzo, 2023',
    status: 'reviewed',
    feedbackCount: 5
  }];
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Mis Papers</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Buscar papers..." />
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {papers.map(paper => <li key={paper.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileTextIcon className="h-6 w-6 text-blue-600" />
                    <p className="ml-3 text-lg font-medium text-blue-600 cursor-pointer hover:underline" onClick={() => onPaperSelect(paper)}>
                      {paper.title}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    {paper.status === 'reviewed' ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Revisado
                      </span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pendiente
                      </span>}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {paper.authors}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {paper.journal}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>{paper.date}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-end space-x-2">
                  <button onClick={() => onFeedback(paper)} className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <MessageCircleIcon className="mr-1 h-4 w-4 text-gray-500" />
                    Feedback ({paper.feedbackCount})
                  </button>
                  <button onClick={() => onPaperSelect(paper)} className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Ver Paper
                  </button>
                </div>
              </div>
            </li>)}
        </ul>
      </div>
    </div>;
}