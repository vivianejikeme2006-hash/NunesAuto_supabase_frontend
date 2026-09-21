import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="pp-nav-links">
      {/* <Link to="/" className="navLogo">NunesAuto</Link> */}

      {/* <div className="navLinks"> */}
        <Link to="/" className="navLink">Home</Link>
        <Link to="/Products" className="navLink">Products</Link>
        <Link to="/About" className="navLink">About Us</Link>
      {/* </div> */}

     </nav>
  );
}

export default NavBar;