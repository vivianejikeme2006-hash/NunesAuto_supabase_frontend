import { useState, useEffect } from 'react'
import './SignUp.css'
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     navigate("/home");
  //   }
  // }, [navigate]);

  const handleChange = (field) => (e) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const submition = async (e) => {
    e.preventDefault();
    setError("");

    if (!data.NameAndSurname || !data.Email || !data.Password || !data.UserNumber || !data.Gender) {
      setError("Please fill in all fields, including gender.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.message || `Sign up failed (status ${res.status})`);
      }

      const response = await res.json();
      console.log("Response frontend", response);

      localStorage.setItem("user", JSON.stringify(response));
      alert("Welcome To The Nunes Auto Family");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='main'>
      <div className='formContainer'>
        <h3 className='heading'>Sign Up</h3>
        <hr />
        <form className='form' onSubmit={submition}>
          <label htmlFor='name'>User Name:</label>
          <input
            id='name'
            type='text'
            placeholder="John Doe"
            value={data.NameAndSurname || ""}
            onChange={handleChange("NameAndSurname")}
            required
          />

          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            placeholder="johndoe@gmail.com"
            value={data.Email || ""}
            onChange={handleChange("Email")}
            required
          />

          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            placeholder='********'
            value={data.Password || ""}
            onChange={handleChange("Password")}
            required
          />

          <label htmlFor='number'>User Number:</label>
          <input
            id='number'
            type='text'
            placeholder="081 234 5678"
            value={data.UserNumber || ""}
            onChange={handleChange("UserNumber")}
            required
          />

          <fieldset className='genderGroup'>
            <legend>Gender</legend>
            <label htmlFor="male">Male</label>
            <input
              type='radio'
              value='Male'
              name='gender'
              id='male'
              checked={data.Gender === 'Male'}
              onChange={handleChange("Gender")}
            />

            <label htmlFor="female">Female</label>
            <input
              type='radio'
              value='Female'
              name='gender'
              id='female'
              checked={data.Gender === 'Female'}
              onChange={handleChange("Gender")}
            />
          </fieldset>

          {error && <p className='error'>{error}</p>}

          <button className='button' type='submit' disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <hr />
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </form>
      </div>
    </div>
  )
}

export default SignUp;