import { Outlet } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import "./SharedLayout.css";

const SharedLayout = () => {
  return (
    <section className="main">
      <Navbar />
      <section className="content">
        <Outlet />
      </section>
    </section>
  );
};

export default SharedLayout;
