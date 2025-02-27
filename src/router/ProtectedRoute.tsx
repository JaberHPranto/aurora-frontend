import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticatedUser = sessionStorage.getItem("api-key");

  return isAuthenticatedUser ? children : <Navigate to="/" />;
};
export default ProtectedRoute;
