import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import { supabase } from "./SupabaseConnection";

const UserProfile = () => {

  // USESTATE THAT STORES THE DATA OF A USER THAT IS SIGNING UP
  const [resetData, setResetData] = useState({
    emailAddress: "",
    currentPassword: "",
    currentPasswordType:"password",
    newPassword: "",
    newPasswordType:"password"
  });
  const [ userData, setUserData ] = useState("")

  // USED TO DISPLAY ERROR MESSAGES IF THE USER SIGNS IN WITH THE WRONG CREDENTIALS OR WRONG REQUIRMENTS
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // USED TO NAVIGATE BETWEEN DIFFERENT COMPONENTS AND PAGE STATES
  const navigate = useNavigate();

  useEffect( ()=>{

    const getUserData = async()=>{
      try{
    const { data } = await supabase.auth.getUser();
    
    // SEEING WHAT DATA IS COLLECTED FROM SUPABASE AUTH
    console.log("User data from supabase: ",data)
    // STORING THE USER'S USERNAME TO DISPLAY ON THE SCREEN
    setUserData(()=>{ return data.user.user_metadata.userName })
    
      } 
    catch (error){
        console.error("Error trying to get the users data: ",error)
      }
    }
      getUserData()
  },[])

  // SUPABASE FUNCTION USED TO LET A USER SIGNUP
  async function resetUsersPassword(event) {
    try {
      // PREVENTING THE NATURAL BEHAVIOUR OF A FORM FROM OCCURING
      event.preventDefault();

      //DESTRUCTURING THE REQUIRED VALUES NEEDED TO RESET THEIR PASSWORD
      const { emailAddress, currentPassword, newPassword } = resetData;

      // MAKING SURE THAT ALL THE INPUT FIELDS HAVE BEEN FILLED IN
      if (!emailAddress.trim() || !currentPassword.trim() || !newPassword.trim()) {
        console.log("Log the destructured value", emailAddress);
        console.log("Log the value", resetData.emailAddress);
        alert("Please fill in all of the fields.");
        return;
      }

      const { data } = await supabase.auth.getUser();

      console.log("Current sessionTOken object returned",data);

      // MAKING SURE THAT THE USER RESETS THE PASSWORD OF THE RIGHT ACCOUNT
      if ( data.user.email !== emailAddress ){
        alert("Incorrect email address");
        return
      }
      else{
      // ENSURING THAT A VALID PASSWORD FORMAT IS BEING USED AS THE NEW PASSWORD
      if (newPassword.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
      }

      // SIGNING THE USER UP ONTO SUPABASE
      const { data, error } = await supabase.auth.updateUser({
  password:  resetData.newPassword,
  current_password: resetData.currentPassword
})

      if (error) {
        return alert(error);
      }

      if (data) {
        sessionStorage.setItem("authenticated", JSON.parse(true));
        alert("Password successfully reset")
        navigate(-1);
      }
    }
    } catch (error) {
      console.error("Sign up error", error);
    }
  }

    const handleResetChange = (event) => {
    const currentInput = event.target.className;
    const currentValue = event.target.value;

    setResetData((prev) => {
      return { ...prev, [currentInput]: currentValue };
    });

  };

   // HANDLES THE DISPLAY OF A USERS PASSWORD
  const passwordDisplay = (event) => {

    // console.log("passwordDisplay was called")
    const passwordInput = event.target.parentElement.children[1];

    // console.log("passwordDisplay was passwordInput: ",passwordInput)
    const displayType = event.target.parentElement.children[1].id;

    if (displayType === "currentPassword") {
      setResetData((prev) => {
        return {
          ...prev,
          currentPasswordType:
            resetData.currentPasswordType === "password" ? "text" : "password",
        };
      });
    } else if( displayType === "newPassword" ){
      setResetData((prev) => {
        return {
          ...prev,
          newPasswordType:
            resetData.newPasswordType === "password" ? "text" : "password",
        };
      });
    }
  };

  return (
    <div className="userProfile-Wrapper">
      <div
      className="userProfile-Conatainer"
      //  className={`authContainer ${isSignUp ? "rightPanelActive" : ""}`}
       >
        {/* PASSWORD FORM */}

        <div
          className="userProfile-formContainer userProfile-signUpContainer " 
        >
          <form onSubmit={resetUsersPassword}>
            <div className="userProfile-Logo">
              <span>NUNES</span>
              <small>AUTO</small>
            </div>

            <h1>Reset your password</h1>


            <div className="inputGroup">
              <label htmlFor="emailAddress">Email Address</label>

              <input
                id="emailAddress"
                type="email"
                name="emailAddress"
                className="emailAddress"
                placeholder="Enter your email"
                defaultValue={resetData.emailAddress}
                onChange={handleResetChange}
                disabled={loading}
              />
            </div>

             <div className="userProfile-inputGroup">
              <label htmlFor="currentPassword">Current Password</label>

              <input
                id="currentPassword"
                type={resetData.currentPasswordType}
                name="currentPassword"
                className="currentPassword"
                placeholder="Your current password"
                defaultValue={resetData.currentPassword}
                onChange={handleResetChange}
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


            <div className="userProfile-inputGroup">
              <label htmlFor="newPassword">New Password</label>

              <input
                id="newPassword"
                type={resetData.newPasswordType}
                name="Password"
                className="newPassword"
                placeholder="Create your new password"
                defaultValue={resetData.newPassword}
                onChange={handleResetChange}
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

         
            <button type="submit" className="userProfile-Button" >
              Update Password
            </button>

              <button
              type="button"
              className="userProfile-homeWhite"
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
                 <button
                  type="button"
                  className="userProfile-logOutWhite"
                  onClick={ ()=>{
                     sessionStorage.setItem("authenticated",JSON.stringify(false) )
                    return navigate("/login");
                    } }
                >
                  Log Out
                </button>
          </form>
        </div>

        {/* =======
            SLIDING OVERLAY
        ======== */}

        <div className="userProfile-overlayContainer">
          <div className="userProfile-overlay">
           {/* RIGHT OVERLAY */}

            <div className="userProfile-overlayPanel userProfile-overlayRight">
              <img src="../car.jpg" alt="BMW M4" className="userProfile-overlayImage" />

              <div className="userProfile-imageOverlay"></div>

              <div className="userProfile-overlayContent">
                <div className="userProfile-overlayBrand">
                  NUNES <span>AUTO</span>
                </div>

                <h1>Hello, {userData}</h1>

                <p>
                  Manage your account
                </p>

                <button
                  type="button"
                  className="userProfile-ghostButton"
                  onClick={ ()=>{
                     sessionStorage.setItem("authenticated",JSON.stringify(false) )
                    return navigate("/login");
                    } }
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
