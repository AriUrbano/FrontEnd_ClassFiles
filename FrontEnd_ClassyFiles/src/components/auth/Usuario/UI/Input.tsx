import React from 'react';
interface InputProps {
  label: string;
  type: string;
  id: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}
const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error
}) => {
  return <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-[#14263C]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input type={type} id={id} name={name || id} value={value} onChange={onChange} placeholder={placeholder} required={required} className={`
          block w-full px-3 py-2 border rounded-md shadow-sm
          text-[#0a0A0c] bg-white
          focus:ring-2 focus:ring-[#d18e41] focus:border-[#d18e41] 
          ${error ? 'border-red-500' : 'border-[#BEBEBE]'}
        `} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>;
};
export default Input;