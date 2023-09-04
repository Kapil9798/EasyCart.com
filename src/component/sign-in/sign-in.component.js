import { useContext, useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword
} from "../../utils/firebase";
import { UserContext } from "../../contexts/user.context";

const defaultUser = {
  email: "",
  password: ""
};

const SignIn = () => {
  const [userDetails, setUserDetails] = useState(defaultUser);
  const { email, password } = userDetails;
  //const { setCurrentUser } = useContext(UserContext);

  const reserUser = () => {
    setUserDetails(defaultUser);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Idafadfa");
      const user = await signInUserWithEmailAndPassword(email, password);
      //setCurrentUser(user);
      reserUser();
      console.log(user);
    } catch (error) {
      console.log("Error during Sign", error);
      if (error.code === "auth/wrong-password") {
        alert("Incorrect password");
      } else if (error.code === "auth/user-not-found") {
        alert("Not found the user with given login");
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();

    const userDocRef = await createUserDocumentFromAuth(response.user);
    //console.log(response);
  };
  return (
    <div className="sign-in-container">
      <h2>I already have a account</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="text"
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
        <div className="buttons-container">
          <Button type="submit">SignIN</Button>
          <Button type="button" onClick={logGoogleUser} buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
