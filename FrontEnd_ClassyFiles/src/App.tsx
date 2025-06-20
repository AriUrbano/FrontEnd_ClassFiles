import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Market } from './components/Market';
import { Pricing } from './components/Pricing';
import { Problem } from './components/Problem';
import { Solution } from './components/Solution';
import { CTA } from './components/CTA';
import { ProjectUpload } from './components/projects/ProjectUpload';
import { UserAuthLayout } from './components/auth/Usuario/AuthLayout';
import { CompanyAuthLayout } from './components/auth/compania/AuthLayout';
import { LoginFormUser } from './components/auth/Usuario/LoginFormUser';
import { RegisterFormUser } from './components/auth/Usuario/RegisterFormUser';
import { CompanLoginForm } from './components/auth/compania/CompaniLoginForm';
import { RegisterFormCompany } from './components/auth/compania/RegisterFormCompany';
import TestConnection from './components/TestConnection';
import { Dashboard } from './components/PagePaper/Dashboard';
import { SecurityProvider } from './components/SecurityProvider';




export function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userType, setUserType] = useState<'user' | 'company' | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('userType') as 'user' | 'company' | null;
    setIsAuth(!!token);
    setUserType(type);
    
    const checkAuth = () => {
      const newToken = localStorage.getItem('token');
      const newType = localStorage.getItem('userType') as 'user' | 'company' | null;
      setIsAuth(!!newToken);
      setUserType(newType);
    };

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);



  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setIsAuth(false);
    setUserType(null);
    window.location.href = '/';
  };

  return (
     <SecurityProvider>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#FFF6F1]">
        <Header 
          isAuth={isAuth} 
          userType={userType} 
          onLogout={handleLogout} 
        />
        <TestConnection/>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/market" element={<Market />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/problem" element={<Problem />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="/cta" element={<CTA />} />

            <Route path="/user-auth" element={<UserAuthLayout><Outlet /></UserAuthLayout>}>
             <Route 
      path="login" 
      element={<LoginFormUser setIsAuth={setIsAuth} setUserType={setUserType} />} 
    />
    <Route 
      path="register" 
      element={<RegisterFormUser setIsAuth={setIsAuth} setUserType={setUserType} />} 
    />
  </Route>

            <Route path="/company-auth" element={<CompanyAuthLayout><Outlet /></CompanyAuthLayout>}>
              <Route path="login" element={<CompanLoginForm setIsAuth={setIsAuth} setUserType={setUserType} />} />
              <Route path="register" element={<RegisterFormCompany setIsAuth={setIsAuth} setUserType={setUserType} />} />
            </Route>

           <Route 
  path="/dashboard" 
  element={isAuth && userType === 'user' ? (
    <Dashboard 
      onPaperSelect={(paper) => {
        // Implementa la lógica para manejar la selección de paper
        console.log('Paper seleccionado:', paper);
      }}
      onFeedback={(paper) => {
        // Implementa la lógica para manejar el feedback
        console.log('Feedback para:', paper);
      }}
    />
  ) : (
    <Navigate to="/user-auth/login" />
  )} 
/>
            
            <Route 
              path="/upload-project" 
              element={isAuth && userType === 'company' ? (
                <ProjectUpload />
              ) : (
                <Navigate to="/company-auth/login" />
              )} 
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
    </SecurityProvider>
  );
}