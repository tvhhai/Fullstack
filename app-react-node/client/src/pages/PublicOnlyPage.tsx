import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';

export default function PublicOnlyPage() {
  const user = useAppSelector((s) => s.auth.user);
  
  // If already logged in, redirect to home
  if (user) return <Navigate to="/" replace />;
  
  return <Outlet />;
}
