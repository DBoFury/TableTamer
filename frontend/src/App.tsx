import LoginPage from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Orders from "./pages/Orders/Orders";
import SharedLayout from "./pages/SharedLayout/SharedLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>
          <Route path="/" element={<Home />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
