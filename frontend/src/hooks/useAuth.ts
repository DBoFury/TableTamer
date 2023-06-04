import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setJwtToken, setUser } from "../stores/reducers";
import api from "../components/API/api";

const useAuth = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const jwt = localStorage.getItem("token");

      if (jwt) {
        try {
          const response = await api.get("/user-details", {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });
          const { firstName, lastName, email, phoneNumber, imageUrl } =
            response.data;
          dispatch(
            setUser({ firstName, lastName, email, phoneNumber, imageUrl })
          );
          dispatch(setJwtToken(jwt));
          setIsAuthenticated(true);
        } catch {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading };
};

export default useAuth;
