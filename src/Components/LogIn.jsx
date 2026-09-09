import React, { useState } from 'react'
import "./LogIn.css"
import { Link, useNavigate } from "react-router-dom";

function LogInForm() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!data.Email || !data.Password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/checkpassword", {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${data.Email}:${data.Password}`)}`,
        },
      });

      if (!res.ok) {
        setError("Invalid username or password");
        return;
      }

      const response = await res.json();
      console.log("Frontend Response", response);

      localStorage.setItem("user", JSON.stringify(response));
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Error signing in, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='main'>
      <div className='LGformContainer'>
        <h3 className='LGheading'>Log In</h3>
        <hr />
        <form className='LGform' onSubmit={handleLogin}>
          <label htmlFor='LGemail'>Email:</label>
          <input
            id='LGemail'
            type='email'
            placeholder="johndoe@gmail.com"
            value={data.Email || ""}
            onChange={handleChange("Email")}
            required
          />

          <label htmlFor='LGpassword'>Password:</label>
          <input
            id='LGpassword'
            type='password'
            placeholder='********'
            value={data.Password || ""}
            onChange={handleChange("Password")}
            required
          />

          {error && <p className='LGerror'>{error}</p>}

          <button className='LGbutton' type='submit' disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </button>

          <hr />
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          <br />
        </form>
      </div>
    </div>
  );
}

export default LogInForm