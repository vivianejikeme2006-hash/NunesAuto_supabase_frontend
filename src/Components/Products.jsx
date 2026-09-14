import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "./Products.css";

function Products() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const res = await fetch("http://localhost:3000/parts");
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setParts(data);
      } catch (err) {
        console.error(err);
        setError("Couldn't load products right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, []);

  const handlePurchase = (part) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      // Not logged in — send to login, remember where they came from
      navigate("/login");
      return;
    }
    // Logged in — proceed (cart logic comes in a later step)
    console.log("Proceeding to purchase:", part);
  };

  return (
    <div className="productsPage">
      <NavBar />
      <h1 className="productsHeading">Our Products</h1>

      {loading && <p className="productsStatus">Loading products...</p>}
      {error && <p className="productsStatus error">{error}</p>}

      <div className="productsGrid">
        {parts.map((part) => (
          <div className="productCard" key={part._id}>
            <img src={part.Image || "/images/placeholder-part.jpg"} alt={part.Name} />
            <h3>{part.Name}</h3>
            <p className="productBrand">{part.Brand}</p>
            <p className="productPrice">R{part.Price}</p>
            <button className="purchaseButton" onClick={() => handlePurchase(part)}>
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;