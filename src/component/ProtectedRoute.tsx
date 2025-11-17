import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = ({ children }: any) => {
  const token = Cookie.get("atsUser");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedRoute;
