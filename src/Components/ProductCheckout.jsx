import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";

import "./ProductCheckout.css";

const ProductCheckout = () => {
  // const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [message, setMessage] = useState("");

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");

  // useEffect(() => {
  //   fetchProduct();
  // }, [id]);

  // const fetchProduct = async () => {
  //   try {
  //     setLoading(true);

  //     const { data, error } = await supabase
  //       .from("products")
  //       .select("*")
  //       .eq("id", id)
  //       .single();

  //     if (error) {
  //       throw error;
  //     }

  //     setProduct(data);
  //   } catch (error) {
  //     console.error("Error loading product:", error);
  //     setMessage("Unable to load this product.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleBuy = async (e) => {
  //   e.preventDefault();

  //   if (!cardholderName || !cardNumber || !month || !year || !cvv) {
  //     setMessage("Please complete all payment fields.");
  //     return;
  //   }

  //   if (cardNumber.replace(/\s/g, "").length < 12) {
  //     setMessage("Please enter a valid card number.");
  //     return;
  //   }

  //   try {
  //     setBuying(true);
  //     setMessage("");

  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     if (!user) {
  //       setMessage("Please log in before placing an order.");
  //       setBuying(false);
  //       return;
  //     }

  //     /*
  //      * IMPORTANT:
  //      * We do NOT save card number or CVV to Supabase.
  //      */

  //     const { error } = await supabase.from("orders").insert([
  //       {
  //         user_id: user.id,
  //         product_id: product.id,
  //         quantity: 1,
  //         total_amount: product.price,
  //         status: "pending",
  //       },
  //     ]);

  //     if (error) {
  //       throw error;
  //     }

  //     setMessage("Order placed successfully!");

  //     setTimeout(() => {
  //       navigate("/orders");
  //     }, 1500);
  //   } catch (error) {
  //     console.error("Order error:", error);
  //     setMessage("Something went wrong while placing your order.");
  //   } finally {
  //     setBuying(false);
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div className="checkout-loading">
  //       Loading product...
  //     </div>
  //   );
  // }

  // if (!product) {
  //   return (
  //     <div className="checkout-error">
  //       <h2>Product not found</h2>
  //       <button onClick={() => navigate("/products")}>
  //         Back to Products
  //       </button>
  //     </div>
  //   );
  // }

  // const productImage =
  //   product.image_url ||
  //   product.image ||
  //   "/images/brake-caliper.png";

  return (
    <div className="checkout-page">

      {/* NAVBAR */}
      {/* <header className="checkout-navbar">

        <div
          className="nunes-logo"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo.png"
            alt="Nunes Auto"
          />
        </div>

        <nav className="checkout-navigation">
          <button onClick={() => navigate("/")}>
            HOME
          </button>

          <button onClick={() => navigate("/products")}>
            PRODUCTS
          </button>

          <button onClick={() => navigate("/about")}>
            ABOUT US
          </button>
        </nav>

        <div className="navbar-icons">

          <button
            className="nav-icon"
            onClick={() => navigate("/cart")}
            aria-label="Cart"
          >
            🛒
          </button>

          <button
            className="nav-icon"
            onClick={() => navigate("/profile")}
            aria-label="Profile"
          >
            👤
          </button>

          <button
            className="nav-icon theme-icon"
            aria-label="Theme"
          >
            ☼
          </button>

        </div>
      </header> */}
      <NavBar />

      {/* MAIN CARD */}
      <main className="checkout-container">

        <div className="checkout-content">

          {/* LEFT SIDE */}
          <section className="product-section">

            <h1 className="product-title">
              {/* {product.name} */}
            </h1>

            <div className="product-area">

              {/* THUMBNAILS */}
              <div className="product-thumbnails">

                <button className="thumbnail active">
                  <img
                    // src={productImage}
                    // alt={product.name}
                  />
                </button>

                <button className="thumbnail">
                  <img
                    // src={productImage}
                    // alt={product.name}
                  />
                </button>

                <button className="thumbnail">
                  <img
                    // src={productImage}
                    // alt={product.name}
                  />
                </button>

                <button className="thumbnail">
                  <img
                    // src={productImage}
                    // alt={product.name}
                  />
                </button>

              </div>

              {/* MAIN IMAGE */}
              <div className="main-product-image">
                <img
                  // src={productImage}
                  // alt={product.name}
                />
              </div>

            </div>

          </section>

          {/* RIGHT SIDE */}
          <section className="payment-section">

            {/* <div className="payment-top">

              <div className="search-box">
                <span className="search-icon">
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Search"
                />
              </div>

              <button className="small-icon">
                👤
              </button>

              <button className="small-icon">
                🛒
              </button>

            </div> */}

            <div className="checkout-divider" />

            <div className="checkout-heading">

              <h2>
                Checkout
              </h2>

              <span>
                {/* R {Number(product.price).toFixed(2)} */}
              </span>

            </div>

            <form
            //  onSubmit={handleBuy}
             >

              {/* CARDHOLDER */}
              <div className="form-group">

                <label>
                  Cardholder Name
                </label>

                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) =>
                    setCardholderName(e.target.value)
                  }
                  placeholder="Cardholder Name"
                />

              </div>

              {/* CARD NUMBER */}
              <div className="form-group">

                <label>
                  Card Number
                </label>

                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(e.target.value)
                  }
                  placeholder="Card Number"
                  maxLength="19"
                />

              </div>

              {/* EXPIRATION + CVV */}
              <div className="payment-row">

                <div className="expiration-group">

                  <label>
                    Expiration
                  </label>

                  <div className="expiration-inputs">

                    <input
                      type="text"
                      placeholder="MM"
                      maxLength="2"
                      value={month}
                      onChange={(e) =>
                        setMonth(e.target.value)
                      }
                    />

                    <input
                      type="text"
                      placeholder="YY"
                      maxLength="2"
                      value={year}
                      onChange={(e) =>
                        setYear(e.target.value)
                      }
                    />

                  </div>

                </div>

                <div className="cvv-group">

                  <label>
                    CVV
                  </label>

                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength="4"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value)
                    }
                  />

                </div>

              </div>

              {/* TOTAL */}
              <div className="balance-row">

                <span>
                  balance amount
                </span>

                <span>
                  {/* R {Number(product.price).toFixed(2)} */}
                </span>

              </div>

              {/* MESSAGE */}
              {message && (
                <p className="checkout-message">
                  {message}
                </p>
              )}

              {/* BUY */}
              <button
                type="submit"
                className="buy-button"
                disabled={buying}
              >
                {buying ? "Processing..." : "Buy"}
              </button>

            </form>

          </section>

        </div>

      </main>

    </div>
  );
};

export default ProductCheckout;