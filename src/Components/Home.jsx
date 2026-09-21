import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar";


const Home = () => {

  // USING NAVIGATE TO NAVIGATE TO OTHER PAGES
  const navigate = useNavigate();



// These point at your project's /public/assets folder (create it, or
// change the paths below to wherever you keep images). Files placed in
// /public are copied as-is and referenced by plain string paths, so
// Vite won't error even before the files exist — you'll just see a
// broken-image icon in the browser until you drop the real file in.
//   - /public/assets/nunes-auto-logo.png   → the Nunes Auto shield logo
//   - /public/assets/hero-car.png          → the hero/product car photo
//   - /public/assets/brands/*.png          → each manufacturer's own logo
//     (these are trademarked — use each brand's official asset, not a recreation)
const LOGO = "/assets/nunes-auto-logo.png";
const HERO_CAR = "/assets/hero-car.png";

const NAV_LINKS = ["Home", "Products", "About Us"];

const BRANDS = [
  { name: "Porsche", logo: "/assets/brands/porsche.png" },
  { name: "Bugatti", logo: "/assets/brands/bugatti.png" },
  { name: "Ferrari", logo: "/assets/brands/ferrari.png" },
  { name: "Lamborghini", logo: "/assets/brands/lamborghini.png" },
  { name: "Aston Martin", logo: "/assets/brands/aston-martin.png" },
  { name: "BMW M", logo: "/assets/brands/bmw-m.png" },
];

  return (
    <div className="na-page">
      <header className="na-navbar">
        <div className="na-brand">
          <img src={LOGO} alt="Nunes Auto" className="na-brand-mark" />
        </div>

      <Navbar />

        <div className="na-nav-icons">
          <button className="na-icon-btn" aria-label="Cart">
             <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
          </button>
          <button className="na-icon-btn na-icon-btn--filled" aria-label="Account" onClick={
            ()=>{ return navigate("/login")} }>
             <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
          </button>
          <button className="na-icon-btn" aria-label="Settings">
             <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg> 
          </button>
        </div>
      </header>

      <section className="na-hero">
        <div className="na-hero-copy">
          <h2 className="na-hero-heading">
            Premium
            <br />
            Car Part Website
            <br />
            In Johannesburg
          </h2>
          <p className="na-hero-sub">
            Don&apos;t deny yourself the pleasure of driving the best
            premium car parts from around the world, here and now.
          </p>
          <div className="na-social-icons">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
            </a>
            <a href="#" aria-label="Twitter / X">
             <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
            </a>
          </div>
        </div>

        <div className="na-hero-visual">
          <h1 className="na-wordmark" aria-hidden="true">
            NUNES AUTO
          </h1>

          <div className="na-car-wrap">
            <img src={HERO_CAR} alt="Featured Nunes Auto vehicle" className="na-car-img" />

            <div className="na-badge na-badge--orders">
              <span className="na-badge-number">3,700</span>
              <span className="na-badge-label">Orders in the Past 2 Years</span>
            </div>
          </div>
        </div>

        <div className="na-hero-side">
          <div className="na-badge na-badge--clients">
            <span className="na-badge-number">1,500</span>
            <span className="na-badge-label">Happy clients</span>
          </div>
          <span className="na-dot" aria-hidden="true" />

          <button type="button" className="na-cta">
            Get started
          </button>
        </div>
      </section>

      <section className="na-brands" aria-label="Brands we stock parts for">
        {BRANDS.map((brand) => (
          <img
            key={brand.name}
            src={brand.logo}
            alt={brand.name}
            className="na-brand-logo"
          />
        ))}
      </section>
    </div>
  );
}

export default Home;