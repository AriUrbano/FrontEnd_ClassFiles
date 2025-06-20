import React, { useState } from 'react';
import { ArrowLeftIcon, SendIcon, XIcon } from 'lucide-react';
export function FeedbackForm({
  paper,
  onComplete
}) {
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const sections = ['Abstract', 'Introducción', 'Metodología', 'Resultados', 'Discusión', 'Conclusiones', 'Referencias', 'General'];
  const handleSubmit = e => {
    e.preventDefault();
    // In a real app, you would send the feedback to the server
    console.log('Submitting feedback:', {
      paper,
      selectedSection,
      feedbackType,
      feedbackText
    });
    onComplete();
  };
  return <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <ArrowLeftIcon className="h-5 w-5 mr-2 cursor-pointer" onClick={onComplete} />
        <h1 className="text-2xl font-bold text-gray-900">
          Proporcionar Feedback
        </h1>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {paper?.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {paper?.authors} • {paper?.journal}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                Sección
              </label>
              <select id="section" name="section" value={selectedSection} onChange={e => setSelectedSection(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" required>
                <option value="" disabled>
                  Selecciona una sección
                </option>
                {sections.map(section => <option key={section} value={section}>
                    {section}
                  </option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Feedback
              </label>
              <div className="mt-2 space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                <div className="flex items-center">
                  <input id="suggestion" name="feedback-type" type="radio" value="suggestion" checked={feedbackType === 'suggestion'} onChange={() => setFeedbackType('suggestion')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                  <label htmlFor="suggestion" className="ml-3 block text-sm font-medium text-gray-700">
                    Sugerencia
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="correction" name="feedback-type" type="radio" value="correction" checked={feedbackType === 'correction'} onChange={() => setFeedbackType('correction')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                  <label htmlFor="correction" className="ml-3 block text-sm font-medium text-gray-700">
                    Corrección
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="question" name="feedback-type" type="radio" value="question" checked={feedbackType === 'question'} onChange={() => setFeedbackType('question')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                  <label htmlFor="question" className="ml-3 block text-sm font-medium text-gray-700">
                    Pregunta
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                Comentarios
              </label>
              <div className="mt-1">
                <textarea id="feedback" name="feedback" rows={4} value={feedbackText} onChange={e => setFeedbackText(e.target.value)} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Escribe tus comentarios aquí..." required></textarea>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onComplete} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <XIcon className="inline-block h-5 w-5 mr-1" />
              Cancelar
            </button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <SendIcon className="inline-block h-5 w-5 mr-1" />
              Enviar Feedback
            </button>
          </div>
        </form>
      </div>
    </div>;
}