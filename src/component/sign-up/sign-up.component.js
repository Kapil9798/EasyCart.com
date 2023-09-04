import { useState } from "react";
import {
  createUserFromEmailAndPassword,
  createUserDocumentFromAuth
} from "../../utils/firebase";

import FormInput from "../form-input/form-input.component";
import "./sign-up.styles.scss";
import Button from "../button/button.component";

const defaultUser = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignUp = () => {
  const [userDetails, setUserDetails] = useState(defaultUser);
  const { displayName, email, password, confirmPassword } = userDetails;

  const reserUser = () => {
    setUserDetails(defaultUser);
  };
  const onSubmitButtonHandler = async (event) => {
    event.preventDefault();
    //console.log("Helo world!!!");

    try {
      if (password !== confirmPassword) {
        alert("Password and confirm password are not same");
      } else {
        let userObject = await createUserFromEmailAndPassword(email, password);
        console.log(userObject);
        await createUserDocumentFromAuth(userObject.user, { displayName });
        reserUser();
      }
    } catch (error) {
      console.log("Error creating the user", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onSubmitButtonHandler}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        ></FormInput>

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        ></FormInput>

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        ></FormInput>

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        ></FormInput>

        <Button type="submit">SignUp</Button>
      </form>
    </div>
  );
};

export default SignUp;
