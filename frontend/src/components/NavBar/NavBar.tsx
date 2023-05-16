import { NavLink } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/orders">Orders</NavLink>
    </nav>
  );
};

export default Navbar;
