import { useState } from 'react'
import './Home.css'
import { Link } from "react-router-dom"
import SignUp from "./SignUp"

function Home() {
    return (
        <div className="notfound-container">
            <h1 className="glow">404</h1>
            <p className="message">Oops! The page you're looking for does not exist</p>
            <Link to="/" element={<SignUp />}>SignUp</Link>
        </div>
    )
}

export default Home