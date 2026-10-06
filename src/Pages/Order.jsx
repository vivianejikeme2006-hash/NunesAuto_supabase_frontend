import React, { useState, useEffect } from "react";
import "./Order.css";
import NavBar from "../Components/NavBar";
import { supabase } from "../Components/SupabaseConnection";

const Order = () => {
  // STATE THAT IS USED TO STORE A USERS ORDERS
  const [orders, setOrders] = useState([]);

  // GETTING A USERS ORDER CARTS FROM THE DATABASE
  useEffect(() => {
    const getMyOrders = async () => {
      try {
        // GETTING THE ACCESSTOKEN FROM SUPABASE AUTH
        const { data } = await supabase.auth.getSession();
        
        // console.log(data);
        const accessToken = data.session.access_token;

        const response = await fetch(
          `${import.meta.env.VITE_RENDER_URL_BACKEND}/myOrders`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const { message } = await response.json();

        // STORING THE COLLECTED CART IN THE orderedCart VARIABLE
        setOrders(() => {
          return message;
        });

        console.log(`Stored order ${message}`);
        console.log(message);

      } catch (error) {
        console.error(
          `Error trying to get the orders from the orders table: `,
          error,
        );
      }
    };
    getMyOrders();
  }, []);

  // Temporary order data
  // Later we can replace this with orders from Supabase
  // const orders = [
  //   {
  //     id: "NA-1001",
  //     date: "05 October 2026",
  //     status: "Processing",
  //     payment: "Card",
  //     products: [
  //       {
  //         name: "Toyota Corolla Brake Pads",
  //         quantity: 1,
  //         price: 850,
  //       },
  //       {
  //         name: "Engine Oil 5W-30",
  //         quantity: 2,
  //         price: 450,
  //       },
  //     ],
  //     total: 1750,
  //   },

  //   {
  //     id: "NA-1000",

  return (
    <div className="orders-page">
      <NavBar />

      <main className="orders-container">
        {/* PAGE HEADER */}
        <div className="orders-header">
          <p className="orders-small-title">NUNESAUTO</p>
          <h1>My Orders</h1>
          <p>View and track your NunesAuto car-parts orders.</p>
        </div>

        {/* ORDER FILTERS */}
        <div className="order-tabs">
          <button className="active-tab">All Orders</button>
          <button>Processing</button>
          <button>Shipped</button>
          <button>Delivered</button>
        </div>

        {/* ORDERS */}
        <div className="orders-list">
          {orders.map((item) => (
            <div className="order-card" key={item.id}>
              {/* ORDER TOP */}
              <div className="order-top">
                <div>
                  <span className="order-label">Order Number</span>
                  <h2>#{item.id.slice(0,12)}</h2>
                </div>

                <div className="order-date">
                  <span className="order-label">Order Date</span>
                  <p>{item["ordered_on"].slice(0,10)}</p>
                </div>

                {/* <div className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </div> */}
              </div>

              {/* DIVIDER */}
              <div className="order-divider"></div>

              {/* PRODUCTS */}
              <div className="order-products">
                <h3>Car Parts</h3>

                {
                item["ordered_products"].map( (product,index) => (
                  <div className="order-product" 
                  key={index}
                  >
                    <div className="product-placeholder">
                      <img src={ product["cart_item"]["image"] } alt="" className="" /> 
                    </div>

                    <div className="product-info">
                      <h4>{ product["cart_item"]["name"] }</h4>
                      <p>Quantity: { product["quantity"] }</p>
                    </div>

                    <div className="product-price">
                      R{ product["cart_item"]["price"] }
                    </div>
                  </div>
                ))}
              </div>

              {/* ORDER BOTTOM */}
              <div className="order-bottom">
                <div className="payment-info">
                  <span>Payment Method</span>
                  <strong>
                    Card
                    </strong>
                </div>

                <div className="order-total">
                  <span>Total Amount</span>
                  <strong>
                   R{orders.length !== 0 && item["ordered_products"].reduce( (total, amount )=>{ return total + amount["cart_item"]["price"]},0)+50 }                   </strong>
                </div>
              </div>

              {/* DETAILS */}
              <div className="order-actions">
                <button className="details-button">View Order Details</button>

                
                  <button className="track-button">Track Order</button>
              
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Order;
