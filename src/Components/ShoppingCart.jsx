import "./ShoppingCart.css";

const cartItems = [
  {
    id: 1,
    image:
    sdfghjk,
    price: 500,
  },
  {
    id: 2,
    image:
    sdfgh,
    price: 500,
  },
  {
    id: 3,
    image:
    qwertyui,
    price: 500,
  },
];

function ShoppingCart() {
  return (
    <div className="shopping-page">
      <div className="shopping-container">

        {/* Page Title */}
        <h1 className="shopping-title">Shopping Cart</h1>

        <div className="cart-layout">

          {/* Cart Products */}
          <div className="cart-box">

            {/* Table Header */}
            <div className="cart-header">
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Action</span>
            </div>

            {/* Products */}
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>

                {/* Product */}
                <div className="product-column">
                  <div className="product-image">
                    <img src={item.image} alt="Car product" />
                  </div>
                </div>

                {/* Quantity */}
                <div className="quantity-column">
                  <div className="quantity-control">
                    <button>-</button>
                    <span>4</span>
                    <button>+</button>
                  </div>
                </div>

                {/* Total */}
                <div className="price-column">
                  <span>R {item.price}</span>
                </div>

                {/* Delete */}
                <div className="action-column">
                  <button className="delete-button" aria-label="Remove item">
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 7H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10 11V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14 11V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 7L7 20H17L18 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 7V4H15V7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="summary-box">

            <h2>Order Summary</h2>

            <button className="apply-button">
              Apply
            </button>

            <div className="summary-row">
              <span>Sub Total</span>
              <span>R 1 500</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>R 50</span>
            </div>

            <div className="summary-row final-total">
              <span>total</span>
              <span>R 1 550</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;