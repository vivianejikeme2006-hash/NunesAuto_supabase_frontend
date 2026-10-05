import React, { useState } from "react";
import "./order.css";

const orders = [
  {
    id: "NUN-89765",
    status: "On Delivery",
    date: "Estimated arrival: 28 May 2026",
    from: "NunesAuto Warehouse",
    to: "Your Delivery Address",
    total: "R 8,490.00",
    items: [
      {
        name: "Brembo Front Brake Disc",
        price: "R 3,990.00",
        qty: 1,
        image: "/images/brake-disc.jpg",
      },
      {
        name: "Performance Air Filter",
        price: "R 450.00",
        qty: 2,
        image: "/images/air-filter.jpg",
      },
    ],
  },
  {
    id: "NUN-81719",
    status: "On Delivery",
    date: "Estimated arrival: 30 May 2026",
    from: "NunesAuto Warehouse",
    to: "Your Delivery Address",
    total: "R 2,300.00",
    items: [
      {
        name: "LED Headlight Bulbs",
        price: "R 2,150.00",
        qty: 1,
        image: "/images/headlight.jpg",
      },
      {
        name: "Universal Fuse Kit",
        price: "R 150.00",
        qty: 1,
        image: "/images/fuse-kit.jpg",
      },
    ],
  },
];

function OrderItem({ item }) {
  return (
    <div className="order-item">
      <div className="product-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="product-info">
        <h4>{item.name}</h4>
        <span>{item.price}</span>
        <small>Qty: {item.qty}</small>
      </div>
    </div>
  );
}

function OrderCard({ order, onDetails }) {
  return (
    <article className="order-card">
      <div className="order-card-top">
        <div>
          <span className="order-label">Order ID</span>
          <h3>▣ {order.id}</h3>
        </div>

        <div className="order-date">
          <span>{order.date}</span>
          <strong>● {order.status}</strong>
        </div>
      </div>

      <div className="delivery-route">
        <div>
          <span>📦</span>
          <p>{order.from}</p>
        </div>

        <div className="route-line">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>

        <div>
          <span>📍</span>
          <p>{order.to}</p>
        </div>
      </div>

      <div className="items-list">
        {order.items.map((item, index) => (
          <OrderItem item={item} key={`${order.id}-${index}`} />
        ))}
      </div>

      <div className="order-card-bottom">
        <div>
          <span>Total:</span>
          <strong>{order.total}</strong>
          <small>({order.items.length} items)</small>
        </div>

        <button onClick={() => onDetails(order)}>Details</button>
      </div>
    </article>
  );
}

export default function Order() {
  const [activeTab, setActiveTab] = useState("shipping");
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="order-page">
      <header className="order-header">
        <button className="menu-button" aria-label="Open menu">
          ☰
        </button>

        <div className="brand">
          <span className="brand-nunes">Nunes</span>
          <span className="brand-auto">Auto</span>
        </div>

        <nav className="top-nav">
          <a href="/">Home</a>
          <a href="/parts">Car Parts</a>
          <a href="/vehicles">Vehicles</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="header-actions">
          <button aria-label="Notifications">♧</button>
          <button aria-label="Account">◉</button>
          <button aria-label="Cart">🛒</button>
        </div>
      </header>

      <div className="category-bar">
        <button>Car Parts⌄</button>
        <button>New Arrivals</button>
        <button>Deals</button>

        <div className="search-box">
          <input placeholder="Search car parts..." />
          <button aria-label="Search">⌕</button>
        </div>

        <button>Engine</button>
        <button>Brakes</button>
        <button>Electrical</button>
        <button>Accessories</button>
      </div>

      <main className="order-content">
        <div className="welcome-row">
          <div>
            <span>Good Morning,</span>
            <h1>My Orders</h1>
          </div>

          <div className="account-links">
            <button>◉ <span>Profile</span></button>
            <button>♡ <span>Wishlist</span></button>
            <button className="active">▣ <span>My Order</span></button>
            <button>◎ <span>Saved Address</span></button>
            <button>⌾ <span>Change Password</span></button>
            <button>↪ <span>Logout</span></button>
          </div>
        </div>

        <div className="orders-layout">
          <aside className="order-sidebar">
            <button
              className={activeTab === "shipping" ? "selected" : ""}
              onClick={() => setActiveTab("shipping")}
            >
              <span>On Shipping</span>
              <b>2</b>
            </button>

            <button
              className={activeTab === "arrived" ? "selected" : ""}
              onClick={() => setActiveTab("arrived")}
            >
              <span>Arrived</span>
              <b>2</b>
            </button>

            <button
              className={activeTab === "cancelled" ? "selected" : ""}
              onClick={() => setActiveTab("cancelled")}
            >
              <span>Cancelled</span>
              <b>1</b>
            </button>
          </aside>

          <section className="orders-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">ACCOUNT</span>
                <h2>
                  {activeTab === "shipping"
                    ? "Orders on the way"
                    : activeTab === "arrived"
                    ? "Arrived orders"
                    : "Cancelled orders"}
                </h2>
              </div>
              <span className="order-count">{orders.length} Orders</span>
            </div>

            {activeTab === "shipping" &&
              orders.map((order) => (
                <OrderCard
                  order={order}
                  key={order.id}
                  onDetails={setSelectedOrder}
                />
              ))}

            {activeTab === "arrived" && (
              <div className="empty-state">
                <div>✓</div>
                <h3>No recently arrived orders</h3>
                <p>Your completed deliveries will appear here.</p>
              </div>
            )}

            {activeTab === "cancelled" && (
              <div className="empty-state">
                <div>×</div>
                <h3>No cancelled orders</h3>
                <p>You don't have any cancelled orders right now.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedOrder(null)}
              aria-label="Close"
            >
              ×
            </button>

            <span className="eyebrow">ORDER DETAILS</span>
            <h2>{selectedOrder.id}</h2>

            <div className="modal-status">
              <span>{selectedOrder.status}</span>
              <strong>{selectedOrder.total}</strong>
            </div>

            <div className="modal-products">
              {selectedOrder.items.map((item, index) => (
                <div className="modal-product" key={index}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>Qty: {item.qty}</p>
                  </div>
                  <strong>{item.price}</strong>
                </div>
              ))}
            </div>

            <div className="modal-delivery">
              <span>Estimated delivery</span>
              <strong>{selectedOrder.date.replace("Estimated arrival: ", "")}</strong>
            </div>

            <button className="track-button">Track Order</button>
          </div>
        </div>
      )}
    </div>
  );
}
// export default Order;