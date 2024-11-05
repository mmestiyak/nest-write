import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';


const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();  // Get user from context

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the requested element
  return element;
};

export default ProtectedRoute;
