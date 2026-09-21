import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar";


const Home = () => {

  // USING NAVIGATE TO NAVIGATE TO OTHER PAGES
  const navigate = useNavigate();

  // 
// const [ allBrands, setAllBrands ] = useState([]);

// useEffect( ()=>{
//  const getAllBrands = async() =>{
//   try{

//   const response = await fetch(`${import.meta.env.VITE_RENDER_URL_BACKEND}/brands`,{
//     headers: { "Content-Type" : "application/json" }
//   });

//   const { message } = await response.json();
  
//   setAllBrands( ()=>{ return [ ...message ] })
// console.log("All of the brands: ",message)

//   }
// catch (error){
//   console.error(error)
// }
//  }

//  getAllBrands()
// },[]) 


  return (
    <div className="na-page">
     
     <Navbar />

      <section className="na-hero">
        <div className="na-hero-copy">
          <h2 className="na-hero-heading">
            Premium
            <br />
            Car Part Website
            <br />
            In Johannesburg
          </h2>
          <p className="na-hero-sub">
            Don&apos;t deny yourself the pleasure of driving the best
            premium car parts from around the world, here and now.
          </p>
          <div className="na-social-icons">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
            </a>
            <a href="#" aria-label="Twitter / X">
             <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
            </a>
          </div>
        </div>

        <div className="na-hero-visual">
          <h1 className="na-wordmark" aria-hidden="true">
            NUNES AUTO
          </h1>

          <div className="na-car-wrap">
            <img src="./car.jpg" alt="Featured Nunes Auto vehicle" className="na-car-img" />

            <div className="na-badge na-badge--orders">
              <span className="na-badge-number">3,700</span>
              <span className="na-badge-label">Orders in the Past 2 Years</span>
            </div>
          </div>
        </div>

        <div className="na-hero-side">
          <div className="na-badge na-badge--clients">
            <span className="na-badge-number">1,500</span>
            <span className="na-badge-label">Happy clients</span>
          </div>
          <span className="na-dot" aria-hidden="true" />

          <button type="button" className="na-cta">
            Get started
          </button>
        </div>
      </section>

      <section className="na-brands" aria-label="Brands we stock parts for">
        {/* {allBrands.map((brand) => (
          <img key={brand.id}
            src={brand.image}
            alt={brand.name}
            className="na-brand-logo"
          />
        ))} */}
           <img
            src="./Porsche.jpg"
            alt="Car logo"
            className="na-brand-logo"
          /> 
            <img
            src="./Ferrari.jpg"
            alt="Car logo"
            className="na-brand-logo"
          /> 
           <img
            src="Lamborghini.jpg"
            alt="Car logo"
            className="na-brand-logo"
          />
            <img
            src="./AstonMartin.jpg"
            alt="Car logo"
            className="na-brand-logo"
          /> 
            <img
            src="./BWM.jpg"
            alt="Car logo"
            className="na-brand-logo"
          />  
      </section>
    </div>
  );
}

export default Home;