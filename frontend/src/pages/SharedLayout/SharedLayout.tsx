import { Outlet } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import "./SharedLayout.css";
import UserAvatar from "../../components/UserAvatar/UserAvatar";

const SharedLayout = () => {
  return (
    <section className="main">
      <div className="header-container">
        <Navbar />
        <UserAvatar />
      </div>
      <section className="content">
        <Outlet />
      </section>
    </section>
  );
};

export default SharedLayout;
