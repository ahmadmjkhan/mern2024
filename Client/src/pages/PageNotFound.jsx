import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <>
      <div class="error-box">
        <div class="error-body text-center">
          <h1 class="error-title text-danger">404</h1>
          <h3 class="text-uppercase error-subtitle">PAGE NOT FOUND !</h3>
          <p class="text-muted mt-4 mb-4">
            YOU SEEM TO BE TRYING TO FIND HIS WAY HOME
          </p>
          <Link
            to="/home"
            class="
              btn btn-danger btn-rounded
              waves-effect waves-light
              mb-5
              text-white
            "
          >
            Back to home
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
