import React, { useState } from 'react';
import "./AdminDashboard.css";
import NavBar from '../Components/NavBar';
import { supabase } from '../Components/SupabaseConnection';


const AdminDashboard = () => {

const [ carPartInfo, setCarPartInfo ] = useState({
  name: "",
  price: null,
  brand:"",
  image:"",
  description:""

})
// ADDING A NEW ITEM TO THE PARTS COLLECTION
const handleAddNewPart = async(event) =>{
  try{

    event.preventDefault();

    const { data } = await supabase.auth.getSession();
    const accessToken = data.session.access_token;
    console.log(data)
    // console.log(accessToken)

    const response = await fetch(`${import.meta.env.VITE_RENDER_URL_BACKEND}/addNewPart`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        name: carPartInfo.name,
  price: parseInt(carPartInfo.price),
  brand:carPartInfo.image,
  image:carPartInfo.image,
  description:carPartInfo.description
      })
    })
 if ( response.status === 200 ){
  setCarPartInfo( ()=>{ return {
    name: "",
  price: null,
  brand:"",
  image:"",
  description:""
  } })
 }
  } catch (error){
    console.error(`Frontend error adding the item to the cart`)
  }
}
  return (
    <div className="app">
      <NavBar />
      <div className="app-shell">
        

        <div className="content">
             {/* <header className="topbar"> */}
      {/* <div className="search-box">
        <span className="search-icon">⌕</span>
        <span>Search</span>
      </div> */}

      {/* CONSIDER REINSTATING THIS COMPONENT */}

      {/* <div className="profile">
        <div className="avatar">👩🏻</div>

        <div className="profile-info">
          <strong>Melly Note</strong>
          <span>mellynote@gmail.com</span>
        </div>
      </div> */}
    {/* </header> */}

          <main className="dashboard">
            <div className="dashboard-header">
              <div>
                <h1>Dashboard</h1>
                <p>
                 Update your store and add new products.
                </p>
              </div>

              <div className="actions">
                <button className="add-project">
                  <span>+</span>
                  Add Car Part
                </button>

                {/* <button className="import-button">
                  Change User Role
                </button> */}
            
              </div>
            </div>
                  <form className="dashboard-body" onSubmit={handleAddNewPart}>
<input type="text" placeholder="Carpart Name" className="dashbord-input" defaultValue={carPartInfo.name} onClick={ (event)=>{ return setCarPartInfo(()=>{ return { ...carPartInfo, name: event.target.value} }) } }/>
<input type="text" placeholder="Car Brand" className="dashbord-input" defaultValue={carPartInfo.brand} onClick={ (event)=>{ return setCarPartInfo(()=>{ return { ...carPartInfo, brand: event.target.value} }) } } />
<input type="number" placeholder="Price" className="dashbord-input" defaultValue={carPartInfo.price} onClick={ (event)=>{ return setCarPartInfo(()=>{ return { ...carPartInfo, price: event.target.value } }) } } />
<input type="text" placeholder="Part Image" className="dashbord-input" defaultValue={carPartInfo.image} onClick={ (event)=>{ return setCarPartInfo(()=>{ return { ...carPartInfo, image: event.target.value} }) } } />
<input type="text" placeholder="Part Description" className="dashbord-input" defaultValue={carPartInfo.description} onClick={ (event)=>{ return setCarPartInfo(()=>{ return { ...carPartInfo, description: event.target.value} }) } } />
<button type="submit" className="addCarPartBtn">Add Part</button>
                  </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;