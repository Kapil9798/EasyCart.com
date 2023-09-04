import React from "react";
import SignUp from "../../component/sign-up/sign-up.component";
import SignIn from "../../component/sign-in/sign-in.component";
import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div>
      <div className="authentication-container">
        <SignIn />
        <SignUp />
      </div>
    </div>
  );
};

export default Authentication;
