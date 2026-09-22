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
    PasswordType: "password",
  });

  // USESTATE THAT STORES THE DATA OF A USER THAT IS SIGNING UP
  const [signInData, setSignInData] = useState({
    Email: "",
    Password: "",
    PasswordType: "password",
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
      console.error("Sign up error", error);
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

  // HANDLES THE DISPLAY OF A USERS PASSWORD
  const passwordDisplay = (event) => {
    // console.log("passwordDisplay was called")
    const passwordInput = event.target.parentElement.children[1];

    // console.log("passwordDisplay was passwordInput: ",passwordInput)
    const displayType = event.target.parentElement.children[1].id;

    if (displayType === "signin-password") {
      setSignInData((prev) => {
        return {
          ...prev,
          PasswordType:
            signInData.PasswordType === "password" ? "text" : "password",
        };
      });
    } else {
      setSignUpData((prev) => {
        return {
          ...prev,
          PasswordType:
            signUpData.PasswordType === "password" ? "text" : "password",
        };
      });
    }
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
                type={signUpData.PasswordType}
                name="Password"
                className="Password"
                placeholder="Create a password"
                defaultValue={signUpData.Password}
                onChange={handleSignUpChange}
                disabled={loading}
              />

              <svg
                onClick={passwordDisplay}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
              >
                <path d="M0 0h16v16H0z" fill="none" />
                <g fill="currentColor">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0" />
                </g>
              </svg>
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
                type={signInData.PasswordType}
                name="Password"
                className="Password"
                placeholder="Enter your password"
                defaultValue={signInData.Password}
                onChange={handleSignInChange}
                // autoComplete="current-password"
                disabled={loading}
              />

              <svg
                onClick={passwordDisplay}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
              >
                <path d="M0 0h16v16H0z" fill="none" />
                <g fill="currentColor">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0" />
                </g>
              </svg>
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
              onClick={() => navigate(-1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="currentColor"
                  d="M21 11H6.414l5.293-5.293l-1.414-1.414L2.586 12l7.707 7.707l1.414-1.414L6.414 13H21z"
                />
              </svg>{" "}
              <span>Back</span>
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
                  onClick={() => navigate(-1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      fill="currentColor"
                      d="M21 11H6.414l5.293-5.293l-1.414-1.414L2.586 12l7.707 7.707l1.414-1.414L6.414 13H21z"
                    />
                  </svg>{" "}
                  <span>Back</span>
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
