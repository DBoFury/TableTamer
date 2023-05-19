import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setJwtToken, setUser } from "../stores/reducers";
import api from "../components/API/api";

interface ProtectedRouteProps {
  children: ReactElement | ReactElement[];
}

//@ts-ignore
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch();

  const checkAuth = () => {
    let jwt = localStorage.getItem("token");
    if (jwt) {
      api
        .get("/user-details", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          const { email, firstName, lastName, phoneNumber } = response.data;
          dispatch(setUser({ email, firstName, lastName, phoneNumber }));
          dispatch(setJwtToken(jwt));
        })
        .catch(() => {
          localStorage.removeItem("token");
          jwt = null;
        });
    }
    return !!jwt;
  };

  return checkAuth() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
