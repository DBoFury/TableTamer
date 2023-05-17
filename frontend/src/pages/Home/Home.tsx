import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "../../components/API/api";
import {
  HallType,
  DepartmentType,
  CategoryType,
  ProductType,
} from "../../stores/types";
import {
  setHalls,
  setDepartments,
  setCategories,
  setProducts,
} from "../../stores/reducers";
import Hall from "../../components/Hall/Hall";
import CreateOrder from "../../components/CreateOrder/CreateOrder";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    api.get("/halls").then((response) => {
      const hallsData: HallType[] = response.data;
      dispatch(setHalls(hallsData));
    });
    api.get("/departments").then((response) => {
      const departmentsData: DepartmentType[] = response.data;
      dispatch(setDepartments(departmentsData));
    });
    api.get("/categories").then((response) => {
      const categoriesData: CategoryType[] = response.data;
      dispatch(setCategories(categoriesData));
    });
    api.get("/products").then((response) => {
      const productsData: ProductType[] = response.data;
      dispatch(setProducts(productsData));
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
