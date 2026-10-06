import React, { useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // USEREFS USED TO DISPLAY THE NAVBAR WHEN IT IS IN THE HAMBURGER FORMAT
  const navLinksTransform = useRef();
  const naNavIconsTransform = useRef();
  const naNavBarTransform = useRef();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const displayNavLinks = () => {
    naNavIconsTransform.current.classList.toggle("naNavIconsTransform");
    navLinksTransform.current.classList.toggle("navLinksTransform");
    naNavBarTransform.current.classList.toggle("naNavBarTransform");
  };

  return (
    <header className="na-navbar" ref={naNavBarTransform}>
      <div className="na-brand">
        <section className=" brandContainer">
          <img
            src="./NunesAutoLogo.jpeg"
            alt="Nunes Auto"
            className="nav-brand-mark"
          />
        </section>
        <svg
          onClick={displayNavLinks}
          className="na-hamburger"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 17h18M3 12h18M3 7h18"
          />
        </svg>
      </div>

      {/* NAVBAR SECTION  */}

      <nav className="pp-nav-links">
        <div className="navLinks" ref={navLinksTransform}>
          <Link to="/" className="navLink">
            Home
          </Link>
          <Link to="/Products" className="navLink">
            Products
          </Link>
          <Link to="/About" className="navLink">
            About Us
          </Link>
          <Link to="/Order" className="navLink">
            Order
          </Link>
          <Link to="/AdminDashboard" className="navLink">
            Admin Dashboard
          </Link>
          
        </div>
      </nav>

      {/* ICONS NAVBAR SECTION */}
      <div className="na-nav-icons" ref={naNavIconsTransform}>
        <Link className="na-icon-btn" aria-label="Cart" to="/checkout">
          <svg
            viewBox="0 0 24 24"
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </Link>
        <Link
          to={
            JSON.parse(sessionStorage.getItem("authenticated"))
              ? "/UserProfile"
              : "/login"
          }
          className="na-icon-btn na-icon-btn--filled"
          aria-label="Account"
        >
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>
        <Link className="na-icon-btn" aria-label="Settings">
          <svg
            viewBox="0 0 24 24"
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </Link>
      </div>
    </header>
  );
}

export default NavBar;
