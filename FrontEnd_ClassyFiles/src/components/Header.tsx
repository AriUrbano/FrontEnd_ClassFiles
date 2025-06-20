import { Link } from 'react-router-dom';

interface HeaderProps {
  isAuth: boolean;
  userType: 'user' | 'company' | null;
  onLogout: () => void;
}

export function Header({ isAuth, userType, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo o nombre de la app */}
          <Link to="/" className="text-xl font-bold text-[#14263C]">
            ClassyFiles
          </Link>

          {/* Menú de navegación */}
          <nav className="flex items-center space-x-4">
            {!isAuth ? (
              <>
                {/* Botones para usuarios NO autenticados */}
                <Link
                  to="/user-auth/login"
                  className="px-3 py-2 text-sm font-medium text-[#14263C] hover:text-[#d18e41]"
                >
                  Iniciar Sesión (Usuario)
                </Link>
                <Link
                  to="/user-auth/register"
                  className="px-3 py-2 text-sm font-medium text-[#14263C] hover:text-[#d18e41]"
                >
                  Registrarse (Usuario)
                </Link>
                <Link
                  to="/company-auth/login"
                  className="px-3 py-2 text-sm font-medium text-[#14263C] hover:text-[#d18e41]"
                >
                  Empresa
                </Link>
              </>
            ) : (
              <>
                {/* Menú para usuarios autenticados */}
                {userType === 'user' && (
                  <Link
                    to="/dashboard"
                    className="px-3 py-2 text-sm font-medium text-[#14263C] hover:text-[#d18e41]"
                  >
                    Mi Panel
                  </Link>
                )}
                {userType === 'company' && (
                  <Link
                    to="/dashboard-empresa"
                    className="px-3 py-2 text-sm font-medium text-[#14263C] hover:text-[#d18e41]"
                  >
                    Panel Empresa
                  </Link>
                )}
                <button
                  onClick={onLogout}
                  className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}