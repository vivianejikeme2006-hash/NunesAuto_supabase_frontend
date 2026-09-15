
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

function AuthPage({ initialMode = "login" }) {
  const [isSignUp, setIsSignUp] = useState(initialMode === "signup");

  const [homeBtnStyling, setHomeBtnStyling ] = useState()

  const [signUpData, setSignUpData] = useState({
    NameAndSurname: "",
    Email: "",
    Password: "",
  });

  const [signInData, setSignInData] = useState({
    Email: "",
    Password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;

    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;

    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const switchMode = (signup) => {
    setIsSignUp(signup);
    setError("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    const {
      NameAndSurname,
      Email,
      Password,
    } = signUpData;

    if (
      !NameAndSurname.trim() ||
      !Email.trim() ||
      !Password
    ) {
      setError("Please complete all fields.");
      return;
    }

    if (Password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NameAndSurname: NameAndSurname.trim(),
          Email: Email.trim(),
          Password,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.message ||
            `Unable to create account (${res.status})`
        );
      }

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/home");
    } catch (err) {
      console.error("Signup error:", err);

      setError(
        err.message ||
          "Something went wrong while creating your account."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    const {
      Email,
      Password,
    } = signInData;

    if (!Email.trim() || !Password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const credentials = btoa(
        `${Email.trim()}:${Password}`
      );

      const res = await fetch(
        "http://localhost:3000/checkpassword",
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Invalid email or password.");
      }

      const data = await res.json();

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message ||
          "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authWrapper">

      <div
        className={`authContainer ${
          isSignUp ? "rightPanelActive" : ""
        }`}
      >

        {/* ================================
            SIGN UP FORM
        ================================= */}

        <div
          className={`formContainerAuth signUpContainer ${
            !isSignUp ? "mobileHidden" : ""
          }`}
        >
          <form onSubmit={handleSignUp}>

            <div className="authLogo">
              <span>NUNES</span>
              <small>AUTO</small>
            </div>

            <h1>Create Account</h1>

            <p className="authSubtitle">
              Join Nunes Auto and start your journey.
            </p>

            <div className="inputGroup">
              <label htmlFor="signup-name">
                Full Name
              </label>

              <input
                id="signup-name"
                type="text"
                name="NameAndSurname"
                placeholder="Enter your full name"
                value={signUpData.NameAndSurname}
                onChange={handleSignUpChange}
                autoComplete="name"
                disabled={loading}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="signup-email">
                Email Address
              </label>

              <input
                id="signup-email"
                type="email"
                name="Email"
                placeholder="Enter your email"
                value={signUpData.Email}
                onChange={handleSignUpChange}
                autoComplete="email"
                disabled={loading}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="signup-password">
                Password
              </label>

              <input
                id="signup-password"
                type="password"
                name="Password"
                placeholder="Create a password"
                value={signUpData.Password}
                onChange={handleSignUpChange}
                autoComplete="new-password"
                disabled={loading}
              />
            </div>

            {isSignUp && error && (
              <div className="authError">
                <span>!</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="authButton"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* <p className="mobileToggleText">
              Already have an account?{" "}

              <button
                type="button"
                className="textButton"
                onClick={() => switchMode(false)}
              >
                Sign In
              </button>
              
            </p> */}

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
          <form onSubmit={handleSignIn}>

            <div className="authLogo">
              <span>NUNES</span>
              <small>AUTO</small>
            </div>

            <h1>Welcome Back</h1>

            <p className="authSubtitle">
              Sign in to continue to Nunes Auto.
            </p>

            <div className="inputGroup">
              <label htmlFor="signin-email">
                Email Address
              </label>

              <input
                id="signin-email"
                type="email"
                name="Email"
                placeholder="Enter your email"
                value={signInData.Email}
                onChange={handleSignInChange}
                autoComplete="email"
                disabled={loading}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="signin-password">
                Password
              </label>

              <input
                id="signin-password"
                type="password"
                name="Password"
                placeholder="Enter your password"
                value={signInData.Password}
                onChange={handleSignInChange}
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            <div className="forgotPassword">
              <button
                type="button"
                className="textButton"
                onClick={() =>
                  setError(
                    "Please contact Nunes Auto support to reset your password."
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

            <button
              type="submit"
              className="authButton"
              disabled={loading}
            >
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

            {/* <p className="mobileToggleText">
              Don't have an account?{" "}

              <button
                type="button"
                className="textButton"
                onClick={() => switchMode(true)}
              >
                Create Account
              </button>
            </p> */}

          </form>
        </div>

        {/* ================================
            SLIDING OVERLAY
        ================================= */}

        <div className="overlayContainer">

          <div className="overlay">

            {/* LEFT OVERLAY */}

            <div className="overlayPanel overlayLeft">

              <img
                src="/images/bmw-m4.jpg"
                alt="BMW M4"
                className="overlayImage"
              />

              <div className="imageOverlay"></div>

              <div className="overlayContent">

                <div className="overlayBrand">
                  NUNES <span>AUTO</span>
                </div>

                <h1>
                  Welcome Back!
                </h1>

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

              <img
                src="/images/bmw-m4.jpg"
                alt="BMW M4"
                className="overlayImage"
              />

              <div className="imageOverlay"></div>

              <div className="overlayContent">

                <div className="overlayBrand">
                  NUNES <span>AUTO</span>
                </div>

                <h1>
                  Hello, Driver!
                </h1>

                <p>
                  New to Nunes Auto?
                  <br />
                  Create your account and get started.
                </p>

                <button
                  type="button"
                  className="ghostButton"
                  onClick={() =>
                     switchMode(true)
                    }
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