import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { supabase } from "./SupabaseConnection";

import "./ProductCheckout.css";

const ProductCheckout = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [total, setTotal] = useState(0);

  const [subTotal, setSubTotal] = useState(0);

  const [isCheckoutHidden, setIsCheckoutHidden] = useState(true);

  const [deliveryLocation, setDeliveryLocation] = useState({
    address: "",
    city: "",
    suburb: "",
    province: "",
    postalCode: "",
  });

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    const getMyCart = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const accessToken = data.session.access_token;

        if (!data.session.access_token) {
          return;
        } else {
          const response = await fetch(
            `${import.meta.env.VITE_RENDER_URL_BACKEND}/getMyCart`,
            {
              metHod: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
              },
            },
          );

          const { message } = await response.json();

          if (response.status !== 200) {
            console.log("Could not get your cart: ", message);
          }

          console.log("Cart items collected: ", message);
          setProducts(() => {
            return message;
          });
        }
      } catch (error) {
        console.error("Error while getting your cart: ", error);
      }
    };

    getMyCart();
  }, []);

  // FUNCTION USED TO REMOVE AN ITEM FROM A USERS CART
  const handleRemoveItem = async (cart_id, index) => {
    try {
      console.log(
        "cart_id of current item to be removed fro the cart: ",
        cart_id,
      );

      const { data } = await supabase.auth.getSession();
      const accessToken = data.session.access_token;

      if (!data.session.access_token) {
        return;
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_RENDER_URL_BACKEND}/cart/${cart_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const { message } = await response.json();

        if (response.status !== 200) {
          console.log("Could not get your cart: ", message);
        }

        console.log("Cart items collected: ", message);
        setProducts(() => {
          return message;
        });
      }

      let newCart = products;

      newCart.splice(index, 1);

      setProducts(() => {
        return [...newCart];
      });
    } catch (error) {
      console.error(
        "Frontend error trying to remove an item from the users cart: ",
        error,
      );
    }
  };

  const handleBuy = async (event) => {
    event.preventDefault();

    try {
      if (!cardholderName || !cardNumber || !cvv) {
        alert("Please complete all payment fields.");
        return;
      }

      if (cardNumber.replace(" ", "").length < 12) {
        alert("Please enter a valid card number.");
        return;
      }

      // COLLECTING THE USERS ACCESS TOKEN TO ALLOW THEM TO MAKE THE ORDER

      const { data } = await supabase.auth.getSession();
      const accessToken = data.session.access_token;

      // console.log(`The access token of the user ${accessToken}`)

      if (accessToken) {
        const response = await fetch(
          `${import.meta.env.VITE_RENDER_URL_BACKEND}/newOrder`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              ordered_products: products,
              delivery_option: 50,
              sub_total: products.reduce((total, amount) => {
                return total + amount["cart_item"]["price"];
              }, 0),
              total:
                products.reduce((total, amount) => {
                  return total + amount["cart_item"]["price"];
                }, 0) + 50,
              address: deliveryLocation.address,
              city: deliveryLocation.city,
              suburb: deliveryLocation.suburb,
              province: deliveryLocation.province,
              postal_code: deliveryLocation.postalCode,
            }),
          },
        );

        const { message } = await response.json();
        console.log(message);
      }

      setProducts([]);
      setIsCheckoutHidden(true);

    } catch (error) {
      console.error("Error trying to order the cart: ", error);
    }
  };

  return (
    <div className="checkout-page">
      <NavBar />

      {/* MAIN CARD */}
      <main className="checkout-container">
        <div className="checkout-content">
          {/* LEFT SIDE */}

          <main className="product-section">
            {/* PRODUCT TITLES */}
            <div className="checkoutTitle">
              <section className="checkoutProductImageTitle">Product</section>
              <section className="checkoutQuantityTitle">Quantity</section>
              <section className="checkoutTotalTitle">Total</section>
              <section className="checkoutActionTitle">Action</section>
            </div>

            {/* PRODUCT DISPLAY */}

            <div className="productInfo">
              {products.map((item, index) => {
                return (
                  <div
                    className="checkoutProducts"
                    id={item["product_id"]}
                    key={index}
                  >
                    <section className="checkoutImageContainer">
                      <img
                        className="checkoutImage"
                        src={item["cart_item"]["image"]}
                      />
                    </section>
                    {/* <section className="checkoutName">
                      {item["cart_item"]["name"]}
                    </section> */}
                    <section className="checkoutQuantity">
                      {item["quantity"]}
                    </section>
                    <section className="checkoutPrice">
                      {item["cart_item"]["price"]}
                    </section>
                    <section
                      onClick={() => {
                        handleRemoveItem(item["id"], index);
                      }}
                    >
                      <svg
                        className="checkoutDeleteItem"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 36 36"
                      >
                        <path d="M0 0h36v36H0z" fill="none" />
                        <path
                          fill="currentColor"
                          d="M27.14 34H8.86A2.93 2.93 0 0 1 6 31V11.23h2V31a.93.93 0 0 0 .86 1h18.28a.93.93 0 0 0 .86-1V11.23h2V31a2.93 2.93 0 0 1-2.86 3"
                          className="clr-i-outline clr-i-outline-path-1"
                        />
                        <path
                          fill="currentColor"
                          d="M30.78 9H5a1 1 0 0 1 0-2h25.78a1 1 0 0 1 0 2"
                          className="clr-i-outline clr-i-outline-path-2"
                        />
                        <path
                          fill="currentColor"
                          d="M21 13h2v15h-2z"
                          className="clr-i-outline clr-i-outline-path-3"
                        />
                        <path
                          fill="currentColor"
                          d="M13 13h2v15h-2z"
                          className="clr-i-outline clr-i-outline-path-4"
                        />
                        <path
                          fill="currentColor"
                          d="M23 5.86h-1.9V4h-6.2v1.86H13V4a2 2 0 0 1 1.9-2h6.2A2 2 0 0 1 23 4Z"
                          className="clr-i-outline clr-i-outline-path-5"
                        />
                        <path fill="none" d="M0 0h36v36H0z" />
                      </svg>
                    </section>
                  </div>
                );
              })}
            </div>
          </main>

          {/* RIGHT SIDE */}
          <section className="payment-section">
            <div className="checkout-divider" />

            <div className="checkout-heading">
              <h2>Checkout</h2>

              <span>{/* R {Number(product.price).toFixed(2)} */}</span>
            </div>

            <form onSubmit={handleBuy}>
              {isCheckoutHidden ? (
                <>
                  {/* TOTAL */}
                  <section className="balance-row">
                    <span>Balance</span>

                    <span>
                      {" "}
                      R{" "}
                      {products.reduce((total, amount) => {
                        return total + amount["cart_item"]["price"];
                      }, 0)}
                    </span>
                  </section>{" "}
                  {/* TOTAL */}
                  <section className="balance-row">
                    <span>Delivery fee</span>

                    <span>{(products.length !== 0)? "R 50" : "R 0"}</span>
                  </section>
                  {/* TOTAL */}
                  <section className="balance-row">
                    <span>Total balance</span>

                    <span>
                      {" "}
                      R{" "}
                      { (products.length !== 0)? products.reduce((total, amount) => {
                        return total + amount["cart_item"]["price"];
                      }, 0) +50 : 0 }
                    </span>
                  </section>
                  {/* BUY */}
                  <button
                    type="button"
                    className="buy-button"
                    onClick={() => {
                      return setIsCheckoutHidden(false);
                    }}
                  >
                    Checkout
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <section className="checkout-inputContainer">
                    {/* CARDHOLDER */}
                    <div className="form-group">
                      <label>
                        <input
                          type="text"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                          placeholder="Cardholder Name"
                        />
                      </label>
                    </div>

                    {/* CARD NUMBER */}
                    <div className="form-group">
                      <label>
                        {" "}
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="Card Number"
                          maxLength="19"
                        />
                      </label>
                    </div>

                    {/* EXPIRATION + CVV */}
                    <div className="payment-row">
                      <div className="form-group">
                        <label>
                          {" "}
                          <input
                            type="text"
                            placeholder="Expiration date"
                            minLength="5"
                            maxLength="5"
                            value={expDate}
                            onChange={(e) => setExpDate(e.target.value)}
                          />
                        </label>
                        <div className="expiration-inputs"></div>
                      </div>

                      <div className="form-group">
                        <label>
                          {" "}
                          <input
                            type="password"
                            placeholder="CVV / CVC"
                            maxLength="4"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        <input
                          type="text"
                          value={deliveryLocation.address}
                          onChange={(e) =>
                            setDeliveryLocation(() => {
                              return {
                                ...deliveryLocation,
                                address: e.target.value,
                              };
                            })
                          }
                          placeholder="Address"
                        />
                      </label>
                    </div>

                    <div className="form-group">
                      <label>
                        <input
                          type="text"
                          value={deliveryLocation.suburb}
                          onChange={(e) =>
                            setDeliveryLocation(() => {
                              return {
                                ...deliveryLocation,
                                suburb: e.target.value,
                              };
                            })
                          }
                          placeholder="Suburb"
                        />
                      </label>
                    </div>

                    <div className="form-group">
                      <label>
                        <input
                          type="text"
                          value={deliveryLocation.city}
                          onChange={(e) =>
                            setDeliveryLocation(() => {
                              return {
                                ...deliveryLocation,
                                city: e.target.value,
                              };
                            })
                          }
                          placeholder="City"
                        />
                      </label>
                    </div>

                    <div className="form-group">
                      <label>
                        <input
                          type="text"
                          value={deliveryLocation.province}
                          onChange={(e) =>
                            setDeliveryLocation(() => {
                              return {
                                ...deliveryLocation,
                                province: e.target.value,
                              };
                            })
                          }
                          placeholder="Province"
                        />
                      </label>
                    </div>

                    <div className="form-group">
                      <label>
                        <input
                          type="text"
                          value={deliveryLocation.postalCode}
                          onChange={(e) =>
                            setDeliveryLocation(() => {
                              return {
                                ...deliveryLocation,
                                postalCode: e.target.value,
                              };
                            })
                          }
                          placeholder="Postal Code"
                        />
                      </label>
                    </div>
                    <section className="checkoutBtnContainer">
                      <button
                        type="button"
                        className="back-button"
                        onClick={() => {
                          return setIsCheckoutHidden(true);
                        }}
                      >
                        Back
                      </button>{" "}
                      <button type="submit" className="pay-button">
                        Pay
                      </button>
                    </section>
                  </section>
                </>
              )}
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProductCheckout;
