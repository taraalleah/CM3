import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">
      <h1>Vehicle Rental</h1>
      </NavLink>
      <div className="links">
        <NavLink to="/">
        Home
        </NavLink>
        <NavLink to="/add-rental">
        Add Rental
        </NavLink>
        <NavLink to="/login">
        Login
        </NavLink>
        <NavLink to="/signup">
        SignUp
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

