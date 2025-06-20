import React, { useState } from 'react';
import { ArrowLeftIcon, MessageCircleIcon, DownloadIcon, BookOpenIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
export function PaperViewer({
  paper,
  onFeedback
}) {
  const [activeTab, setActiveTab] = useState('preview');
  // Mock paper content
  const paperContent = `
    # ${paper?.title || 'Título del Paper'}
    **Autores:** ${paper?.authors || 'Autores del Paper'}
    **Revista:** ${paper?.journal || 'Revista del Paper'}
    ## Abstract
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl.
    ## Introducción
    Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl.
    ## Metodología
    Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl.
    ## Resultados
    Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl.
    ## Conclusiones
    Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies nisl nisl aliquet nisl.
    ## Referencias
    1. Autor, A. (2020). Título del artículo. *Nombre de la revista*, 10(2), 100-110.
    2. Autor, B. y Autor, C. (2019). Título del libro. Editorial.
    3. Autor, D., Autor, E. y Autor, F. (2021). Título del artículo. *Nombre de la revista*, 15(3), 200-215.
  `;
  // Mock paper issues
  const paperIssues = [{
    id: 1,
    section: 'Metodología',
    type: 'error',
    description: 'La metodología no está claramente definida. Se recomienda detallar mejor los pasos seguidos.'
  }, {
    id: 2,
    section: 'Resultados',
    type: 'warning',
    description: 'Los resultados podrían beneficiarse de representaciones gráficas adicionales.'
  }, {
    id: 3,
    section: 'Referencias',
    type: 'error',
    description: 'La referencia #2 no sigue el formato APA requerido.'
  }];
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <ArrowLeftIcon className="h-6 w-6 mr-2 cursor-pointer" onClick={() => window.history.back()} />
          {paper?.title}
        </h1>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <DownloadIcon className="mr-1 h-4 w-4" />
            Descargar PDF
          </button>
          <button onClick={onFeedback} className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <MessageCircleIcon className="mr-1 h-4 w-4" />
            Dar Feedback
          </button>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button onClick={() => setActiveTab('preview')} className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'preview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <BookOpenIcon className="inline-block h-5 w-5 mr-1" />
              Vista Previa
            </button>
            <button onClick={() => setActiveTab('issues')} className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'issues' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <CheckCircleIcon className="inline-block h-5 w-5 mr-1" />
              Problemas ({paperIssues.length})
            </button>
            <button onClick={() => setActiveTab('feedback')} className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'feedback' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <MessageCircleIcon className="inline-block h-5 w-5 mr-1" />
              Feedback ({paper?.feedbackCount || 0})
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'preview' && <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-serif">
                {paperContent}
              </pre>
            </div>}
          {activeTab === 'issues' && <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Se han encontrado {paperIssues.length} problemas en este paper
                que requieren atención.
              </p>
              <ul className="divide-y divide-gray-200">
                {paperIssues.map(issue => <li key={issue.id} className="py-4">
                    <div className="flex items-start">
                      {issue.type === 'error' ? <XCircleIcon className="h-5 w-5 text-red-500 mt-0.5" /> : <CheckCircleIcon className="h-5 w-5 text-yellow-500 mt-0.5" />}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Sección: {issue.section}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          {issue.description}
                        </p>
                      </div>
                    </div>
                  </li>)}
              </ul>
            </div>}
          {activeTab === 'feedback' && <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Este paper ha recibido {paper?.feedbackCount || 0} comentarios
                de feedback.
              </p>
              {paper?.feedbackCount > 0 ? <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex">
                      <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Dr. María González
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          El análisis estadístico es sólido, pero recomendaría
                          incluir más detalles sobre la metodología utilizada en
                          la sección 3.
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          12 Mayo, 2023
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex">
                      <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Prof. Juan Martínez
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          Excelente trabajo en general. La discusión podría
                          beneficiarse de una comparación más directa con los
                          trabajos citados en las referencias 3 y 7.
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          10 Mayo, 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </div> : <div className="text-center py-6">
                  <MessageCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No hay feedback
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Este paper aún no ha recibido ningún comentario.
                  </p>
                  <div className="mt-6">
                    <button onClick={onFeedback} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                      Añadir Feedback
                    </button>
                  </div>
                </div>}
            </div>}
        </div>
      </div>
    </div>;
}