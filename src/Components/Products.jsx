import React, { useEffect, useState } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar"


const Products = () => {

  // USED TO NAVIGATE BETWEEN THE DIFFERENT COMPONENTS 
 const navigate = useNavigate();

//  STATE VARIABLE TGHAT IS USED TO STORE THE PRODUCTS COLLECTED FROM THE DATABASE
const [ allParts,setAllParts] = useState([]);

//  USEEFFECT THAT WILL COLLECT ALL OF THE PRODUCTS FROM THE PRODUCTS COLLECTION

useEffect( ()=>{

  const getAllParts = async() =>{
    try{

      // console.log("Function started");

      const  response = await fetch(`${import.meta.env.VITE_RENDER_URL_BACKEND}/parts`,{
        headers: {
          "Content-Type":"application/json"
        }
      })

      const { message } = await response.json();
      setAllParts( ()=>{ return [ ...message ] })
      console.log("Cart parts collected in the useEffect: ",message)

    } catch (error){
      console.error("Error trying to collect all of the parts from the database");
    }

  }

  // CALLING THE FUNCTION TO GET ALL OF THE PARTS FROM THE DATABASE
    getAllParts();

},[])



// --- Content -----------------------------------------------------------
// Swap these placeholder paths for real images once you have them.
// Anything under /public is referenced as a plain string path, so the
// app still builds and runs even before the files exist — you'll just
// see a broken-image icon until you drop the real file in.

const LOGO = "/assets/nunes-auto-logo.png";
const HERO_WHEEL = "/assets/products/hero-wheel.png";

const CATEGORIES = [
  { name: "Tyres", image: "/assets/products/category-tyres.png" },
  { name: "Suspensions", image: "/assets/products/category-suspensions.png" },
  { name: "Engines", image: "/assets/products/category-engines.png" },
];

function formatPrice(amount) {
  return `R ${amount.toFixed(2)}`;
}



  return (
    <div className="pp-page">
     
        <Navbar />
       
      <section className="pp-hero">
        <div className="pp-hero-copy">
          <h1 className="pp-hero-tag">NEW</h1>
          <p className="pp-hero-heading">
            Ultra Wheel
            <br />
            19&quot; Rims
          </p>
        </div>
        <img src={HERO_WHEEL} alt="Ultra Wheel 19 inch rim" className="pp-hero-img" />
      </section>



{/* SECTION USEDTO DISPLAY THE PRODUCTS THAT YOU WANT TO FILTER OUT */}
      <section className="pp-categories" aria-label="Shop by category">
        {CATEGORIES.map((category) => (
          <a key={category.name} href={`/products/${category.name.toLowerCase()}`} className="pp-category-card">
            <img src={category.image} alt={category.name} className="pp-category-img" />
            <div className="pp-category-overlay">
              <span className="pp-category-name">{category.name}</span>
              <span className="pp-category-shop">Shop now</span>
            </div>
          </a>
        ))}
      </section>



{/* SECTION USED TO DISPLAY ALL OF THE AVAILABLE PRODUCTS */}
      <section className="pp-products">
        <h2 className="pp-products-heading">New Products</h2>

        <div className="pp-products-grid">
          {allParts.map((product) => (
            <div key={product.id} className="pp-product-card">
              <img src={product.image} alt={product.name} className="pp-product-img" />
              <p className="pp-product-name">{product.brand}</p>
              <p className="pp-product-name">{product.name}</p>
              <div className="pp-product-footer">
                <span className="pp-product-price">{formatPrice(product.price)}</span>
                <button type="button" className="pp-add-cart">
                  Add Cart 
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>



    </div>
  );
}

export default Products;