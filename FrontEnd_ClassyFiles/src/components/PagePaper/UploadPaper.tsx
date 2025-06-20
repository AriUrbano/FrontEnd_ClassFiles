import React, { useState } from 'react';
import { UploadIcon, XIcon, FileIcon, CheckIcon } from 'lucide-react';
export function UploadPaper({
  onComplete
}) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [abstract, setAbstract] = useState('');
  const [journal, setJournal] = useState('');
  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };
  const handleChange = e => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };
  const handleFiles = newFiles => {
    const fileArray = Array.from(newFiles).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setFiles([...files, ...fileArray]);
  };
  const removeFile = index => {
    setFiles(files.filter((_, i) => i !== index));
  };
  const handleSubmit = e => {
    e.preventDefault();
    // In a real app, you would upload the files and metadata here
    console.log('Submitting paper:', {
      title,
      authors,
      abstract,
      journal,
      files
    });
    onComplete();
  };
  return <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Subir Nuevo Paper
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título del Paper
          </label>
          <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
        </div>
        <div>
          <label htmlFor="authors" className="block text-sm font-medium text-gray-700">
            Autores
          </label>
          <input type="text" name="authors" id="authors" value={authors} onChange={e => setAuthors(e.target.value)} placeholder="Ej: García, M., López, J." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
        </div>
        <div>
          <label htmlFor="journal" className="block text-sm font-medium text-gray-700">
            Revista o Conferencia
          </label>
          <input type="text" name="journal" id="journal" value={journal} onChange={e => setJournal(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="abstract" className="block text-sm font-medium text-gray-700">
            Resumen
          </label>
          <textarea id="abstract" name="abstract" rows={4} value={abstract} onChange={e => setAbstract(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Archivo PDF
          </label>
          <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}>
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Subir un archivo</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf,.doc,.docx" onChange={handleChange} />
                </label>
                <p className="pl-1">o arrastrar y soltar</p>
              </div>
              <p className="text-xs text-gray-500">PDF, DOC, DOCX hasta 10MB</p>
            </div>
          </div>
        </div>
        {files.length > 0 && <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700">
              Archivos seleccionados:
            </h4>
            <ul className="mt-2 divide-y divide-gray-200 border border-gray-200 rounded-md">
              {files.map((file, index) => <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <FileIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                    <span className="ml-2 flex-1 w-0 truncate">
                      {file.name}
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button type="button" onClick={() => removeFile(index)} className="font-medium text-red-600 hover:text-red-500">
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                </li>)}
            </ul>
          </div>}
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onComplete} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancelar
          </button>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <CheckIcon className="mr-2 h-5 w-5" />
            Subir Paper
          </button>
        </div>
      </form>
    </div>;
}