import { Navigate, Outlet } from "react-router-dom";
import { useAuthToken } from "../../store/useAuthToken.store";

const ProtectedRoute = () => {
  const { token } = useAuthToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
