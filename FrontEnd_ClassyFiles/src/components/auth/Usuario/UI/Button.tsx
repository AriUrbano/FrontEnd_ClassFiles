import React from 'react';
interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  onClick,
  disabled = false
}) => {
  const baseStyles = 'font-medium rounded-md px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-[#14263C] text-white hover:bg-[#0a0A0c] focus:ring-[#14263C]',
    secondary: 'bg-[#d18e41] text-white hover:bg-[#c17e31] focus:ring-[#d18e41]',
    outline: 'bg-transparent text-[#14263C] border border-[#14263C] hover:bg-[#14263C]/5 focus:ring-[#14263C]'
  };
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || isLoading ? 'opacity-70 cursor-not-allowed' : '';
  return <button type={type} onClick={onClick} disabled={disabled || isLoading} className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${disabledClass} flex justify-center items-center`}>
      {isLoading ? <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Procesando...
        </> : children}
    </button>;
};
export default Button;