// components/auth/compania/AuthLayout.tsx
interface CompanyAuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const CompanyAuthLayout: React.FC<CompanyAuthLayoutProps> = ({ children, title, subtitle }) => (
  <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    {title && <h1 className="text-2xl font-bold text-[#14263C]">{title}</h1>}
    {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
    {children}
  </div>
);