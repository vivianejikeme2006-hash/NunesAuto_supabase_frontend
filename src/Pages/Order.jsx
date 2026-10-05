import "./Order.css";
import NavBar from "../Components/NavBar"


const Order = () => {
  // Temporary order data
  // Later we can replace this with orders from Supabase
  const orders = [
    {
      id: "NA-1001",
      date: "05 October 2026",
      status: "Processing",
      payment: "Card",
      products: [
        {
          name: "Toyota Corolla Brake Pads",
          quantity: 1,
          price: 850,
        },
        {
          name: "Engine Oil 5W-30",
          quantity: 2,
          price: 450,
        },
      ],
      total: 1750,
    },

    {
      id: "NA-1000",
      date: "28 September 2026",
      status: "Delivered",
      payment: "Card",
      products: [
        {
          name: "VW Polo Air Filter",
          quantity: 1,
          price: 320,
        },
        {
          name: "Bosch Spark Plugs",
          quantity: 4,
          price: 180,
        },
      ],
      total: 1040,
    },
  ];

  return (
    <div className="orders-page">
      <NavBar />

      <main className="orders-container">

        {/* PAGE HEADER */}
        <div className="orders-header">
          <p className="orders-small-title">NUNESAUTO</p>
          <h1>My Orders</h1>
          <p>
            View and track your NunesAuto car-parts orders.
          </p>
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

          {orders.map((order) => (
            <div className="order-card" key={order.id}>

              {/* ORDER TOP */}
              <div className="order-top">

                <div>
                  <span className="order-label">Order Number</span>
                  <h2>#{order.id}</h2>
                </div>

                <div className="order-date">
                  <span className="order-label">Order Date</span>
                  <p>{order.date}</p>
                </div>

                <div className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </div>

              </div>

              {/* DIVIDER */}
              <div className="order-divider"></div>

              {/* PRODUCTS */}
              <div className="order-products">

                <h3>Car Parts</h3>

                {order.products.map((product, index) => (
                  <div className="order-product" key={index}>

                    <div className="product-placeholder">
                      🚗
                    </div>

                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p>Quantity: {product.quantity}</p>
                    </div>

                    <div className="product-price">
                      R{product.price.toFixed(2)}
                    </div>

                  </div>
                ))}

              </div>

              {/* ORDER BOTTOM */}
              <div className="order-bottom">

                <div className="payment-info">
                  <span>Payment Method</span>
                  <strong>{order.payment}</strong>
                </div>

                <div className="order-total">
                  <span>Total Amount</span>
                  <strong>R{order.total.toFixed(2)}</strong>
                </div>

              </div>

              {/* DETAILS */}
              <div className="order-actions">
                <button className="details-button">
                  View Order Details
                </button>

                {order.status !== "Delivered" && (
                  <button className="track-button">
                    Track Order
                  </button>
                )}
              </div>

            </div>
          ))}

        </div>

      </main>
    </div>
  );
};

export default Order;