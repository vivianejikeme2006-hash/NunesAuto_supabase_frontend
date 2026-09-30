import React, { useState } from "react";
import "./Checkout.css";

// Small inline SVG icons — no external icon package needed.
const ShoppingCart = (props) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
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

const Search = (props) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

// --- Content -----------------------------------------------------------
// Swap these placeholder paths for real images once you have them.
const LOGO = "/assets/nunes-auto-logo.png";

const NAV_LINKS = ["Home", "Products", "About Us"];

export default function ProductDetail({
  product = {
    name: "Brake Caliper",
    price: 500,
    images: [
      "/assets/products/brake-caliper-1.png",
      "/assets/products/brake-caliper-2.png",
      "/assets/products/brake-caliper-3.png",
      "/assets/products/brake-caliper-4.png",
    ],
  },
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function formatPrice(amount) {
    return `R ${amount.toFixed(0)}`;
  }

  async function handleBuy(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      // IMPORTANT: never send raw card details (number, expiry, CVV) to your
      // own backend or store them anywhere — that's a PCI-DSS compliance
      // problem. Use a payment processor's hosted field / client SDK
      // (e.g. Stripe Elements, Paystack, Yoco) which tokenizes the card in
      // the browser and gives you a safe token to send to your server
      // instead. This handler is a UI stub — wire it up to whichever
      // processor you choose once that's decided.
      console.log("Submit checkout for", product.name, {
        cardholderName,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="pd-page">
      <header className="pd-navbar">
        <div className="pd-brand">
          <img src={LOGO} alt="Nunes Auto" className="pd-brand-mark" />
        </div>

        <nav className="pd-nav-links" aria-label="Primary">
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href={label === "Home" ? "/" : `/${label.toLowerCase().replace(" ", "-")}`}
              className={label === "Products" ? "pd-nav-active" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="pd-nav-icons">
          <button className="pd-icon-btn" aria-label="Cart">
            <ShoppingCart />
          </button>
          <button className="pd-icon-btn pd-icon-btn--filled" aria-label="Account">
            <User />
          </button>
          <button className="pd-icon-btn" aria-label="Settings">
            <Settings />
          </button>
        </div>
      </header>

      <div className="pd-card">
        <div className="pd-gallery-side">
          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-gallery">
            <div className="pd-thumbs">
              {product.images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  className={`pd-thumb ${index === activeImage ? "pd-thumb--active" : ""}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>

            <div className="pd-main-image">
              <img src={product.images[activeImage]} alt={product.name} />
            </div>
          </div>
        </div>

        <div className="pd-divider" />

        <div className="pd-checkout-side">
          <div className="pd-toolbar">
            <div className="pd-search">
              <Search />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search products"
              />
            </div>
            <button className="pd-toolbar-btn" aria-label="Account">
              <User />
            </button>
            <button className="pd-toolbar-btn" aria-label="Cart">
              <ShoppingCart />
            </button>
          </div>

          <div className="pd-checkout-header">
            <h2>Checkout</h2>
            <span className="pd-checkout-price">{formatPrice(product.price)}</span>
          </div>

          <form className="pd-form" onSubmit={handleBuy}>
            <input
              type="text"
              className="pd-input"
              placeholder="Cardholder Name"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              autoComplete="cc-name"
              required
            />

            <input
              type="text"
              inputMode="numeric"
              className="pd-input"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              autoComplete="cc-number"
              required
            />

            <div className="pd-form-row">
              <div className="pd-form-group">
                <span className="pd-form-label">Expiration</span>
                <div className="pd-expiry">
                  <input
                    type="text"
                    inputMode="numeric"
                    className="pd-input pd-input--small"
                    placeholder="MM"
                    maxLength={2}
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    autoComplete="cc-exp-month"
                    required
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    className="pd-input pd-input--small"
                    placeholder="YY"
                    maxLength={2}
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    autoComplete="cc-exp-year"
                    required
                  />
                </div>
              </div>

              <div className="pd-form-group">
                <span className="pd-form-label">CVV</span>
                <input
                  type="text"
                  inputMode="numeric"
                  className="pd-input pd-input--small pd-input--cvv"
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  autoComplete="cc-csc"
                  required
                />
              </div>
            </div>

            <div className="pd-balance-row">
              <span>balance amount</span>
              <span>{formatPrice(product.price)}</span>
            </div>

            <button type="submit" className="pd-buy-btn" disabled={submitting}>
              {submitting ? "Processing…" : "Buy"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}