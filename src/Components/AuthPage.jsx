import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import { createClient } from "@supabase/supabase-js";

function AuthPage({ initialMode = "login" }) {
  const [isSignUp, setIsSignUp] = useState(initialMode === "signup");

  // USESTATE THAT STORES THE DATA OF A USER THAT IS SIGNING UP
  const [signUpData, setSignUpData] = useState({
    NameAndSurname: "",
    Email: "",
    Password: "",
  });

  // USESTATE THAT STORES THE DATA OF A USER THAT IS SIGNING UP
  const [signInData, setSignInData] = useState({
    Email: "",
    Password: "",
  });

  // USED TO DISPLAY ERROR MESSAGES IF THE USER SIGNS IN WITH THE WRONG CREDENTIALS OR WRONG REQUIRMENTS
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // USED TO NAVIGATE BETWEEN DIFFERENT COMPONENTS AND PAGE STATES
  const navigate = useNavigate();

  // CONNECTION USED TO CONNECT TO STRING TO CONNECT TO SUPABASE
  const supabase = createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

  // SUPABASE FUNCTION USED TO LET A USER SIGNUP
  async function signUpNewUser(event) {
    try {
      // PREVENTING THE NATURAL BEHAVIOUR OF A FORM FROM OCCURING
      event.preventDefault();

      //DESTRUCTURING THE REQUIRED VALUES NEEDED TO SIGN UP
      const { NameAndSurname, Email, Password } = signUpData;

      // MAKING SURE THAT ALL THE INPUT FIELDS HAVE BEEN FILLED IN
      if (!NameAndSurname.trim() || !Email.trim() || !Password) {
        console.log("Log the destructured value", NameAndSurname);
        console.log("Log the value", signUpData.NameAndSurname);
        setError("Please complete all fields.");
        return;
      }

      // ENSURING THAT A VALID PASSWORD IS BEING USED TO CREATE TTHE ACCOUNT
      if (Password.length < 6) {
        setError("Password must contain at least 6 characters.");
        return;
      }

      // SIGNING THE USER UP ONTO SUPABASE
      const { data, error } = await supabase.auth.signUp({
        name: signUpData.NameAndSurname.trim(),
        email: signUpData.Email.trim(),
        password: signUpData.Password,
      });

      if (error) {
        alert(error);
        return alert(error);
      }

      if (data) {
        const response = await fetch(
          `${import.meta.env.VITE_RENDER_URL_BACKEND}/signup`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userName: signUpData.NameAndSurname,
              email: signUpData.Email,
            }),
          },
        );

        let { message } = await response.json();
        console.log(message);
        navigate(-1);
      }
    } catch (error) {
      console.error("Sign up error",error);
    }
  }

  // SUPABASE FUNCTION USED TO LET A USER SIGN INTO THE APPLICATION
  async function signInWithEmail(event) {
    try {
      event.preventDefault();

      const { Email, Password } = signInData;

      if (!Email.trim() || !Password) {
        setError("Please enter your email and password.");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInData.Email,
        password: signInData.Password,
      });

      if (error) {
        alert(error);
        return alert(error);
      }
      console.log(data);
      navigate(-1);
    } catch (error) {
      console.error("Login error:", err);

      setError(err.message || "Unable to sign in. Please try again.");
    }
  }

  // CONTROLLING THE DISPLAY OF THE INPUT FIELDS ON THE SIGN IN PAGE
  const handleSignUpChange = (event) => {
    const currentInput = event.target.className;
    const currentValue = event.target.value;

    setSignUpData((prev) => {
      return { ...prev, [currentInput]: currentValue };
    });

    setError("");
  };

  // CONTROLLING THE DISPLAY OF THE INPUT FIELDS ON THE SIGN IN PAGE
  const handleSignInChange = (event) => {
    const currentInput = event.target.className;
    const currentValue = event.target.value;

    setSignInData((prev) => {
      return { ...prev, [currentInput]: currentValue };
    });

    setError("");
  };

  const switchMode = (signup) => {
    setIsSignUp(signup);
    setError("");
  };

 
  return (
    <div className="authWrapper">
      <div className={`authContainer ${isSignUp ? "rightPanelActive" : ""}`}>
        {/* ================================
            SIGN UP FORM
        ================================= */}

        <div
          className={`formContainerAuth signUpContainer ${
            !isSignUp ? "mobileHidden" : ""
          }`}
        >
          <form onSubmit={signUpNewUser}>
            <div className="authLogo">
              <span>NUNES</span>
              <small>AUTO</small>
            </div>

            <h1>Create Account</h1>

            <p className="authSubtitle">
              Join Nunes Auto and start your journey.
            </p>

            <div className="inputGroup">
              <label htmlFor="signup-name">Full Name</label>

              <input
                id="signup-name"
                type="text"
                name="NameAndSurname"
                className="NameAndSurname"
                placeholder="Enter your full name"
                defaultValue={signUpData.NameAndSurname}
                onChange={handleSignUpChange}
                disabled={loading}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="signup-email">Email Address</label>

              <input
                id="signup-email"
                type="email"
                name="Email"
                className="Email"
                placeholder="Enter your email"
                defaultValue={signUpData.Email}
                onChange={handleSignUpChange}
                disabled={loading}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="signup-password">Password</label>

              <input
                id="signup-password"
                type="password"
                name="Password"
                className="Password"
                placeholder="Create a password"
                defaultValue={signUpData.Password}
                onChange={handleSignUpChange}
                disabled={loading}
              />
            </div>

            {isSignUp && error && (
              <div className="authError">
                <span>!</span>
                {error}
              </div>
            )}

            <button type="submit" className="authButton" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* ================================
            SIGN IN FORM
        ================================= */}

        <div
          className={`formContainerAuth signInContainer ${
            isSignUp ? "mobileHidden" : ""
          }`}
        >
          <form onSubmit={signInWithEmail}>
            <div className="authLogo">
              <span>NUNES</span>
              <small>AUTO</small>
            </div>

            <h1>Welcome Back</h1>

            <p className="authSubtitle">Sign in to continue to Nunes Auto.</p>

            <div className="inputGroup">
              <label htmlFor="signin-email">Email Address</label>

              <input
                id="signin-email"
                type="email"
                name="Email"
                className="Email"
                placeholder="Enter your email"
                defaultValue={signInData.Email}
                onChange={handleSignInChange}
                // autoComplete="email"
                disabled={loading}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="signin-password">Password</label>

              <input
                id="signin-password"
                type="password"
                name="Password"
                className="Password"
                placeholder="Enter your password"
                defaultValue={signInData.Password}
                onChange={handleSignInChange}
                // autoComplete="current-password"
                disabled={loading}
              />
            </div>

            <div className="forgotPassword">
              <button
                type="button"
                className="textButton"
                onClick={() =>
                  setError(
                    "Please contact Nunes Auto support to reset your password.",
                  )
                }
              >
                Forgot password?
              </button>
            </div>

            {!isSignUp && error && (
              <div className="authError">
                <span>!</span>
                {error}
              </div>
            )}

            <button type="submit" className="authButton" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
            <button
              type="button"
              className="homeWhite"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </form>
        </div>

        {/* ================================
            SLIDING OVERLAY
        ================================= */}

        <div className="overlayContainer">
          <div className="overlay">
            {/* LEFT OVERLAY */}

            <div className="overlayPanel overlayLeft">
              <img src="../car.jpg" alt="BMW M4" className="overlayImage" />

              <div className="imageOverlay"></div>

              <div className="overlayContent">
                <div className="overlayBrand">
                  NUNES <span>AUTO</span>
                </div>

                <h1>Welcome Back!</h1>

                <p>
                  Your next drive is waiting.
                  <br />
                  Sign in and continue your journey.
                </p>

                <button
                  type="button"
                  className="ghostButton"
                  onClick={() => switchMode(false)}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="homeBlue"
                  onClick={() => navigate("/")}
                >
                  Home
                </button>
              </div>
            </div>

            {/* RIGHT OVERLAY */}

            <div className="overlayPanel overlayRight">
              <img src="../car.jpg" alt="BMW M4" className="overlayImage" />

              <div className="imageOverlay"></div>

              <div className="overlayContent">
                <div className="overlayBrand">
                  NUNES <span>AUTO</span>
                </div>

                <h1>Hello, Driver!</h1>

                <p>
                  New to Nunes Auto?
                  <br />
                  Create your account and get started.
                </p>

                <button
                  type="button"
                  className="ghostButton"
                  onClick={() => switchMode(true)}
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
