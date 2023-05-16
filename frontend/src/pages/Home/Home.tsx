import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "../../components/API/api";
import { HallType } from "../../stores/types";
import { setHallsData } from "../../stores/reducers";
import Hall from "../../components/Hall/Hall";
import CreateOrder from "../../components/CreateOrder/CreateOrder";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    api.get("/halls").then((response) => {
      const hallsData: HallType[] = response.data;
      dispatch(setHallsData(hallsData));
    });
  }, []);

  return (
    <div className="home-container">
      <Hall />
      <CreateOrder />
    </div>
  );
};

export default Home;
