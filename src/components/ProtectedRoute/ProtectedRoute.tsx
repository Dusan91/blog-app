import { Navigate, Outlet } from "react-router-dom";
interface ProtectedRouteProps {
  redirectPath?: string;
  isLogin?: boolean;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isLogin = false,
  redirectPath = "/login",
}) => {
  const isAuthenticated = Boolean(localStorage.getItem("user"));
  // If user IS loged in and try to navigate to login or if user is NOT loged in and try to navigate to admin,
  // redirect to / route
  if ((!isAuthenticated && !isLogin) || (isLogin && isAuthenticated))
    return <Navigate to={redirectPath} replace />;
  return <Outlet />;
};

export default ProtectedRoute;
