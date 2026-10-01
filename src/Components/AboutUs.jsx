import React from "react";
import "./AboutUs.css";
import NavBar from "./NavBar";

// Small inline SVG icons — no external icon package needed.
const ShoppingCart = (props) => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const User = (props) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Settings = (props) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Twitter = (props) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const Facebook = (props) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// --- Content -----------------------------------------------------------
// Swap these placeholder paths for real images once you have them.
// Anything under /public is referenced as a plain string path, so the
// app still builds and runs even before the files exist — you'll just
// see a broken-image icon until you drop the real file in.

const LOGO = "/assets/nunes-auto-logo.png";
const HERO_BG = "/assets/about/hero-engine.jpg";
const PARTS_PHOTO = "/assets/about/parts-photo.jpg";
const WHY_CHOOSE_BG = "/assets/about/why-choose-engine.jpg";

const NAV_LINKS = ["Home", "Products", "About Us"];

const STATS = [
  { number: "3700 +", label: "Orders in The Past 2 Years" },
  { number: "1500 +", label: "Happy Clients" },
  { number: "8+", label: "Years Experience" },
  { number: "1000 +", label: "Parts Sold" },
];

const VALUES = [
  "Affordable Prices: We make car parts budget-friendly without compromising on quality.",
  "Quality Parts: Every part we sell is carefully inspected to ensure reliability and performance.",
  "Fast Delivery: Get the parts you need delivered quickly and conveniently to your doorstep.",
];

export default function AboutUs() {
  return (
    <div className="au-page">
      
      <NavBar />

      <section
        className="au-hero"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div className="au-hero-overlay" />
        <div className="au-hero-content">
          <h1 className="au-hero-title">About NunesAuto</h1>
          <p className="au-hero-copy">
            At NunesAuto, we make car parts more affordable and accessible.
            <br />
            Our mission is to help you save money while keeping your vehicle running smoothly.
            <br />
            We sell quality second-hand and new car parts at lower prices and deliver them right to your door.
          </p>
        </div>
      </section>

      <section className="au-stats-section">
        <img src={PARTS_PHOTO} alt="Car parts" className="au-stats-photo" />

        <div className="au-stats-content">
          <div className="au-stats-row">
            {STATS.map((stat) => (
              <div key={stat.label} className="au-stat">
                <span className="au-stat-number">{stat.number}</span>
                <span className="au-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <h2 className="au-values-heading">Our Values</h2>
          <ul className="au-values-list">
            {VALUES.map((value) => {
              const [title, ...rest] = value.split(": ");
              return (
                <li key={title}>
                  <strong>{title}:</strong> {rest.join(": ")}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        className="au-why"
        style={{ backgroundImage: `url(${WHY_CHOOSE_BG})` }}
      >
        <div className="au-why-overlay" />
        <div className="au-why-content">
          <h2 className="au-why-title">Why Choose Us</h2>
          <p className="au-why-copy">
            Nunes Auto is here to make car maintenance easier, cheaper, and stress-free.
            Whether you&apos;re a car enthusiast or just need a replacement part, we&apos;ve got you covered.
          </p>
        </div>
      </section>

      <footer className="au-footer">
        <div className="au-footer-col">
          <img src="./NunesAutoLogo.jpeg" alt="Nunes Auto" className="au-footer-logo" />
          <h3 className="au-footer-heading">NunesAuto</h3>
          <p className="au-footer-text">
            Your one-stop shop for affordable and reliable car parts
            <br />
            We&apos;ve got you covered.
            <br />
            © 2026 NunesAuto.
            <br />
            All rights reserved.
          </p>
        </div>

        <div className="au-footer-col">
          <h3 className="au-footer-heading">Contact Us</h3>
          <p className="au-footer-text">
            Email:
            <br />
            info@nunesauto.com
            <br />
            Phone: +27 098 1234
          </p>
        </div>

        <div className="au-footer-col">
          <h3 className="au-footer-heading">Follow Us</h3>
          <div className="au-footer-social">
            <a href="#" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="#" aria-label="Twitter / X">
              <Twitter />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}