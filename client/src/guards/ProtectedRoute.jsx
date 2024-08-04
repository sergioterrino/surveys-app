import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to={'/login'} replace />

  return <Outlet />; // esto es para que siga con el componente que está dentro
}

export default ProtectedRoute