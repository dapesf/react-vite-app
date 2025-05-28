import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: any) {
  let isAuthenticated = localStorage.getItem('token');

  //debug
  isAuthenticated = "asdsad"

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  return children;
}

export function RedirectToHomePage() {
  const isAuthenticated = localStorage.getItem('token');

  if (isAuthenticated) {
    return <Navigate to="/HomePage" replace />;
  }
}