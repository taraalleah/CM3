import { NavLink } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };
  return (
    <nav className="navbar">
      <NavLink to="/">
      <h1>Vehicle Rental</h1>
      </NavLink>
      <NavLink to="/">
        Home
        </NavLink>
      <div className="links">
        <div>
        {isAuthenticated && ( 
          <div>
        <NavLink to="/add-rental">
        Add Rental
        </NavLink>
          <span>{JSON.parse(localStorage.getItem("user")).username}</span>
          <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!isAuthenticated && (
          <div>
        <NavLink to="/login">
        Login
        </NavLink>
        <NavLink to="/signup">
        SignUp
        </NavLink>
        </div>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

