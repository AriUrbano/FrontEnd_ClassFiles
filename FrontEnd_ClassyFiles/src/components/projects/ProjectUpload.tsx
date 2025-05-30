import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileIcon, UploadCloudIcon, AlertCircleIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
interface FormData {
  title: string;
  summary: string;
  area: string;
  documents: File[];
  budget: string;
  timeline: string;
}
export function ProjectUpload() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    summary: '',
    area: '',
    documents: [],
    budget: '',
    timeline: ''
  });
  const areas = ['Medicina', 'Biología', 'Química', 'Física', 'Ingeniería', 'Ciencias Sociales', 'Humanidades', 'Otros'];
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => file.size <= 50 * 1024 * 1024); // 50MB limit
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...validFiles]
    }));
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 50 * 1024 * 1024 // 50MB
  });
  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  return <div className="min-h-screen bg-[#FFF6F1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-[#D18E41]">Classy</span>
            <span className="text-2xl font-bold text-[#14263C]">Files</span>
          </div>
          <h2 className="text-3xl font-bold text-[#14263C]">
            Subir Nuevo Proyecto
          </h2>
        </div>
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map(step => <div key={step} className="flex flex-col items-center flex-1 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step <= currentStep ? 'bg-[#D18E41] text-white' : 'bg-[#BEBEBE] text-white'}`}>
                  {step}
                </div>
                <div className={`mt-2 text-sm ${step <= currentStep ? 'text-[#14263C]' : 'text-[#BEBEBE]'}`}>
                  {step === 1 ? 'Metadatos' : step === 2 ? 'Documentos' : 'Financiamiento'}
                </div>
                {step < 3 && <div className={`absolute top-4 left-1/2 w-full h-0.5 ${step < currentStep ? 'bg-[#D18E41]' : 'bg-[#BEBEBE]'}`} />}
              </div>)}
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Metadata */}
            {currentStep === 1 && <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-[#14263C]">
                    Título del Proyecto
                  </label>
                  <input type="text" id="title" required className="mt-1 block w-full border border-[#BEBEBE] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41]" value={formData.title} onChange={e => setFormData({
                ...formData,
                title: e.target.value
              })} />
                </div>
                <div>
                  <label htmlFor="summary" className="block text-sm font-medium text-[#14263C]">
                    Resumen
                  </label>
                  <textarea id="summary" rows={4} required className="mt-1 block w-full border border-[#BEBEBE] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41]" value={formData.summary} onChange={e => setFormData({
                ...formData,
                summary: e.target.value
              })} />
                </div>
                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-[#14263C]">
                    Área Científica
                  </label>
                  <select id="area" required className="mt-1 block w-full border border-[#BEBEBE] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41]" value={formData.area} onChange={e => setFormData({
                ...formData,
                area: e.target.value
              })}>
                    <option value="">Seleccione un área</option>
                    {areas.map(area => <option key={area} value={area}>
                        {area}
                      </option>)}
                  </select>
                </div>
              </div>}
            {/* Step 2: Document Upload */}
            {currentStep === 2 && <div className="space-y-6">
                <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-[#D18E41] bg-[#D18E41]/10' : 'border-[#BEBEBE] hover:border-[#D18E41]'}`}>
                  <input {...getInputProps()} />
                  <UploadCloudIcon className="mx-auto h-12 w-12 text-[#BEBEBE]" />
                  <p className="mt-2 text-sm text-[#14263C]">
                    Arrastre y suelte archivos PDF aquí, o haga clic para
                    seleccionar
                  </p>
                  <p className="text-xs text-[#BEBEBE] mt-1">
                    Máximo 50MB por archivo
                  </p>
                </div>
                {formData.documents.length > 0 && <div className="space-y-2">
                    {formData.documents.map((file, index) => <div key={index} className="flex items-center justify-between p-3 bg-[#FFF6F1] rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileIcon className="text-[#D18E41]" />
                          <span className="text-sm text-[#14263C]">
                            {file.name}
                          </span>
                        </div>
                        <button type="button" onClick={() => removeFile(index)} className="text-[#BEBEBE] hover:text-[#14263C]">
                          <AlertCircleIcon size={20} />
                        </button>
                      </div>)}
                  </div>}
              </div>}
            {/* Step 3: Funding */}
            {currentStep === 3 && <div className="space-y-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-[#14263C]">
                    Presupuesto Solicitado (USD)
                  </label>
                  <input type="number" id="budget" required min="0" className="mt-1 block w-full border border-[#BEBEBE] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41]" value={formData.budget} onChange={e => setFormData({
                ...formData,
                budget: e.target.value
              })} />
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-[#14263C]">
                    Plazo de Ejecución (meses)
                  </label>
                  <input type="number" id="timeline" required min="1" className="mt-1 block w-full border border-[#BEBEBE] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#D18E41] focus:border-[#D18E41]" value={formData.timeline} onChange={e => setFormData({
                ...formData,
                timeline: e.target.value
              })} />
                </div>
              </div>}
            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && <button type="button" onClick={prevStep} className="flex items-center px-4 py-2 border border-[#14263C] text-[#14263C] rounded-md hover:bg-[#14263C] hover:text-white transition-colors">
                  <ChevronLeftIcon size={20} className="mr-2" />
                  Anterior
                </button>}
              <div className="ml-auto">
                {currentStep < 3 ? <button type="button" onClick={nextStep} className="flex items-center px-4 py-2 bg-[#14263C] text-white rounded-md hover:bg-opacity-90 transition-colors">
                    Siguiente
                    <ChevronRightIcon size={20} className="ml-2" />
                  </button> : <button type="submit" className="flex items-center px-6 py-2 bg-[#D18E41] text-white rounded-md hover:bg-opacity-90 transition-colors">
                    Enviar para Revisión
                  </button>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>;
}