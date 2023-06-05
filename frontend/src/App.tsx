import LoginPage from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Orders from "./pages/Orders/Orders";
import SharedLayout from "./pages/SharedLayout/SharedLayout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "./components/API/api";
import {
  HallType,
  DepartmentType,
  CategoryType,
  ProductType,
} from "./stores/types";
import {
  setHalls,
  setDepartments,
  setCategories,
  setProducts,
} from "./stores/reducers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
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
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
