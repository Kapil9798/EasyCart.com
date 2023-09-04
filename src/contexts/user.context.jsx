/*  using reducer now */

import { createContext, useEffect, useReducer, useState } from "react";
import { onAuthStateChangedListener } from "../utils/firebase";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

export const userReducer = (state, action) => {
  // console.log("dispatch", action);
  const { type, payload } = action;

  switch (type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: payload
      };
    default:
      throw new Error("Incorrect type of action for user");
  }
};

let INITIAL_STATE = {
  currentUser: null
};
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  let { currentUser } = state;

  let setCurrentUser = (user) =>
    dispatch({ type: "SET_CURRENT_USER", payload: user });
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unSubscribe = onAuthStateChangedListener((user) =>
      setCurrentUser(user)
    );
    return unSubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/*  Not using Reducer, using useState */
// import { createContext, useEffect, useState } from "react";
// import { onAuthStateChangedListener } from "../utils/firebase";

// export const UserContext = createContext({
//   currentUser: null,
//   setCurrentUser: () => null
// });

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const value = { currentUser, setCurrentUser };

//   useEffect(() => {
//     const unSubscribe = onAuthStateChangedListener((user) =>
//       setCurrentUser(user)
//     );
//     return unSubscribe;
//   }, []);

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };
