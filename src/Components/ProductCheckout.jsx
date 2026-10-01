import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { supabase } from "./SupabaseConnection";

import "./ProductCheckout.css";

const ProductCheckout = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [cardDetails, setCardDetails] = useState({
    cardHolderName:"",
    cardNumber:"",
    expirationDate:"",
    CVV:""
  });
  const [deliveryLocation, setDeliveryLocation] = useState({
    address:"",
    city:"",
    suburb:"",
    province:"",
    postalCode:"",
    // :"",
  });
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
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
                authorization: `Bearer ${accessToken}`
              }
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
const handleRemoveItem = async(cart_id,index)=>{
  try{

      console.log("cart_id of current item to be removed fro the cart: ",cart_id)

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
                authorization: `Bearer ${accessToken}`
              }
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

 newCart.splice(index,1);

 setProducts( ()=>{ return [...newCart ] } );

  }
  catch (error){
    console.error("Frontend error trying to remove an item from the users cart: ",error)
  }
}

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

  //   } catch (error) {
  //     console.error("Order error:", error);
  //     setMessage("Something went wrong while placing your order.");
  //   } finally {
  //     setBuying(false);
  //   }
  // };

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
              <section className="checkoutBrandTitle">Brand</section>
              <section className="checkoutNameTitle">Name</section>
              <section className="checkoutQuantityTitle">Quantity</section>
              <section className="checkoutPriceTitle">Price</section>
            </div>

            {/* PRODUCT DISPLAY */}

            <div className="productInfo">
              { products.map((item,index) => {
                return (
                  <div
                    className="checkoutProducts"
                    id={item["product_id"]}
                    key={index}
                  >
                    <section className="checkoutImage">
                      {item["cart_item"]["brand"]}
                    </section>
                    <section className="checkoutName">
                      {item["cart_item"]["name"]}
                    </section>
                    <section className="checkoutQuantity">
                      {item["quantity"]}
                    </section>
                    <section className="checkoutPrice">
                      {item["cart_item"]["price"]}
                    </section>
                     <section className="checkoutDeleteItem" onClick={ ()=>{ handleRemoveItem(item["id"],index) } } >
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8m-4 9a9 9 0 1 1 0-18a9 9 0 0 1 0 18" />
</svg>

                    </section>
                  </div>
                );
              })}
            </div>
          </main>

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
              <h2>Checkout</h2>

              <span>{/* R {Number(product.price).toFixed(2)} */}</span>
            </div>

            <form
            //  onSubmit={handleBuy}
            >
              <section className="checkout-inputContainer">

              {/* CARDHOLDER */}
              <div className="form-group">
                <label><input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Cardholder Name"
                /></label>
              </div>

              {/* CARD NUMBER */}
              <div className="form-group">
                <label> <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Card Number"
                  maxLength="19"
                /></label>
              </div>

              {/* EXPIRATION + CVV */}
              <div className="payment-row">
                <div className="form-group">
                  <label>  <input
                      type="text"
                      placeholder="Expiration date"
                        minLength="5"
                      maxLength="5"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    /></label>
                  <div className="expiration-inputs">
                  </div>
                </div>

                <div className="form-group">
                  <label> <input
                    type="password"
                    placeholder="CVV / CVC"
                    maxLength="4"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  /></label>
                </div>
              </div>

                <div className="form-group">
                <label><input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Address"
                /></label>
              </div>

                <div className="form-group">
                <label><input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Suburb"
                /></label>
              </div>

                <div className="form-group">
                <label><input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="City"
                /></label>
              </div>

  <div className="form-group">
                <label><input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Province"
                /></label>
              </div>

                <div className="form-group">
                <label><input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Postal Code"
                /></label>
              </div>
</section>
              

              {/* TOTAL */}
              <section className="balance-row">
                <span>Total balance</span>

                <span> R { products.reduce( (total,amount)=>{ return (total +amount["cart_item"]["price"])},0)}</span>
              </section>
                {/* BUY */}
              <button type="submit" className="buy-button">
                Checkout
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProductCheckout;
