import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = document.cookie.includes('token'); // simple check

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;