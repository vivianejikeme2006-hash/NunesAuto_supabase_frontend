import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    console.log("Protected route started");

    const authenticated = JSON.parse(sessionStorage.getItem("authenticated"))
console.log(typeof(authenticated))
console.log(authenticated)
    if (
      authenticated !== null &&
      authenticated
    ) {
      console.log("Protected route speed");
      return children;
    } else {
      console.log("Unsuccessful protected routing attempt");
      return < Navigate to="/" />;
     ;
    }

};

export default ProtectedRoute;
