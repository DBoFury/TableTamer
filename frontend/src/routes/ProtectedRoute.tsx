import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setJwtToken } from "../stores/reducers";

interface ProtectedRouteProps {
  children: ReactElement | ReactElement[];
}

//@ts-ignore
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch();

  const checkAuth = () => {
    const jwt = localStorage.getItem("token");
    dispatch(setJwtToken(jwt));
    return !!jwt;
  };

  return checkAuth() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
