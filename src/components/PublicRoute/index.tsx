import { Navigate, Outlet } from "react-router-dom";
import { useAuthToken } from "../../store/useAuthToken.store";

const PublicRoute = () => {
  const { token } = useAuthToken();

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
