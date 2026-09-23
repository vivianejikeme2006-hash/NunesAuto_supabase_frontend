import React, { useEffect, useState } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar";
import { supabase } from "./SupabaseConnection";

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

const addToCart = async(selectedItem)=>{
  try{

    // GETTING THE ACCESS TOKEN 
    const { data, error } = await supabase.auth.getSession();

    if ( error ){
      console.error(error);
      alert("Login to add the item to your cart.");
    }

console.log("Item to add to cart: ",selectedItem)
   console.log("Users access token", data);

    const response = await fetch(`${import.meta.env.VITE_RENDER_URL_BACKEND}/addToCart`,{
      method : "POST",
      headers: {
        "Content-Type":"application/json",
        "authorization": `Bearer ${data.session.access_token}`
      },
      body: JSON.stringify({
product_id: selectedItem.id,
cart_item: selectedItem,
quantity: 1
      })

    });

    if( response.status !== 200 ){
      alert("Login to add the item to your cart.");
    }

   const dataResponse = await response.json();
    console.log("Response from product added to the cart: ",dataResponse);

  } catch (error){
    console.error("Error trying to add a product to a cart: ",error)
  }
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
        <img src="./productPageBannerWheel.png" alt="Ultra Wheel 19 inch rim" className="pp-hero-img" />
      </section>



{/* SECTION USEDTO DISPLAY THE PRODUCTS THAT YOU WANT TO FILTER OUT */}
      <section className="pp-categories" aria-label="Shop by category">
        
          <section className="pp-category-card">
            <img src="./productPageBannerWheel.png" alt="Tyres" className="pp-category-img" />
            <div className="pp-category-overlay">
              <span className="pp-category-name">Tyres</span>
              <span className="pp-category-shop">Shop now</span>
            </div>
          </section>

            <section className="pp-category-card">
            <img src="./productPageSuspension.jpeg" alt="Suspensions" className="pp-category-img" />
            <div className="pp-category-overlay">
              <span className="pp-category-name">Suspensions</span>
              <span className="pp-category-shop">Shop now</span>
            </div>
          </section>

          <section className="pp-category-card">
            <img src="./productPageEngine.jpeg" alt="Engine" className="pp-category-img" />
            <div className="pp-category-overlay">
              <span className="pp-category-name">Engines</span>
              <span className="pp-category-shop">Shop now</span>
            </div>
          </section>
       
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
                <span className="pp-product-price">{product.price}</span>
                <button type="button" className="pp-add-cart" onClick={ ()=>{ return addToCart(product) } }>
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