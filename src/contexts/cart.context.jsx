import { createContext, useReducer, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setCartState: () => null,
  cartItem: [],
  addItemToCart: () => null,
  totalQuantity: 0,
  isCheckoutPage: false,
  changeQuantity: () => null,
  deleteItem: () => null,
  totalPrice: 0
});

const cartReducer = (state, action) => {
  console.log("cartReducer", action);
  const { type, payload } = action;
  switch (type) {
    case "SET_CART_ITEM":
      return {
        ...state,
        ...payload
      };
    case "IS_CART_OPEN":
      return {
        ...state,
        isCartOpen: payload
      };
    default:
      new Error("incorrect type of cart reducer");
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItem: [],
  totalQuantity: 0,
  totalPrice: 0
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const addItemToCart = (item) => {
    let cartProducts = [];
    const { id, name, imageUrl, price } = item;
    let isProductAreadyPresent = false;
    state.cartItem.forEach((value) => {
      if (value.id === id) {
        isProductAreadyPresent = true;
      }
    });

    cartProducts = cartItem.map((value) => {
      if (value.id === id) {
        return {
          ...value,
          quantity: value.quantity + 1
        };
      } else {
        return value;
      }
    });

    if (!isProductAreadyPresent) {
      cartProducts = [
        ...cartProducts,
        { id, name, imageUrl, price, quantity: 1 }
      ];
    }
    updateCartItemReducer(cartProducts);
  };
  const changeQuantity = (item, type) => {
    let cartProducts = [];
    cartProducts = state.cartItem.map((value) => {
      if (value.id === item.id) {
        if (type === "increment") {
          return { ...value, quantity: value.quantity + 1 };
        } else {
          return { ...value, quantity: value.quantity - 1 };
        }
      } else {
        return value;
      }
    });
    updateCartItemReducer(cartProducts);
  };
  const deleteItem = (item) => {
    let cartProducts = [];
    cartProducts = state.cartItem.filter((value) => {
      if (value.id === item.id) return false;
      else return true;
    });
    updateCartItemReducer(cartProducts);
  };
  const updateCartItemReducer = (cartProducts) => {
    let totalQuantity = cartProducts.reduce((total, value) => {
      return (total = total + value.quantity);
    }, 0);

    let totalPrice = cartProducts.reduce((totalPrice, value) => {
      return (totalPrice = totalPrice + value.price * value.quantity);
    }, 0);

    dispatch({
      type: "SET_CART_ITEM",
      payload: {
        cartItem: cartProducts,
        totalQuantity: totalQuantity,
        totalPrice: totalPrice
      }
    });
  };
  const setCartState = (bool) => {
    dispatch({
      type: "IS_CART_OPEN",
      payload: bool
    });
  };
  const { cartItem, totalPrice, totalQuantity, isCartOpen } = state;

  console.log("state", state);

  const value = {
    isCartOpen,
    setCartState,
    cartItem,
    addItemToCart,
    totalQuantity,
    changeQuantity,
    deleteItem,
    totalPrice
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// import { createContext, useState } from "react";

// export const CartContext = createContext({
//   isCartOpen: false,
//   setCartState: () => null,
//   cartItem: [],
//   addItemToCart: () => null,
//   totalQuantity: 0,
//   isCheckoutPage: false,
//   setIsCheckout: () => null,
//   changeQuantity: () => null,
//   deleteItem: () => null,
//   totalPrice: 0
// });

// export const CartContextProvider = ({ children }) => {
//   const [isCartOpen, setCartState] = useState(false);
//   const [cartItem, setCartItem] = useState([]);
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   const [isCheckoutPage, setIsCheckout] = useState(false);
//   const [totalPrice, setTotalPrice] = useState(0);

//   const addItemToCart = (item) => {
//     console.log("Heloo  from cart");
//     const { id, name, imageUrl, price } = item;

//     let isProductAreadyPresent = false;
//     cartItem.forEach((value) => {
//       if (value.id === id) {
//         isProductAreadyPresent = true;
//       }
//     });
//     let cartProducts = cartItem.map((value) => {
//       if (value.id === id) {
//         return {
//           ...value,
//           quantity: value.quantity + 1
//         };
//       } else {
//         return value;
//       }
//     });

//     if (!isProductAreadyPresent) {
//       cartProducts = [
//         ...cartProducts,
//         { id, name, imageUrl, price, quantity: 1 }
//       ];
//     }

//     let totalQuantity = cartProducts.reduce((total, value) => {
//       return (total = total + value.quantity);
//     }, 0);

//     setTotalQuantity(totalQuantity);
//     console.log(totalQuantity);
//     setCartItem(cartProducts);

//     let totalPrice = cartProducts.reduce((totalPrice, value) => {
//       return (totalPrice = totalPrice + value.price * value.quantity);
//     }, 0);

//     setTotalPrice(totalPrice);
//     console.log(cartProducts);
//   };

//   const changeQuantity = (id, value) => {
//     let updateCartItem = cartItem.map((item) => {
//       if (item.id === id) {
//         if (value === "increment")
//           return { ...item, quantity: item.quantity + 1 };
//         else return { ...item, quantity: item.quantity - 1 };
//       } else {
//         return item;
//       }
//     });

//     let totalQuantity = updateCartItem.reduce((total, value) => {
//       return (total = total + value.quantity);
//     }, 0);

//     let totalPrice = updateCartItem.reduce((totalPrice, value) => {
//       return (totalPrice = totalPrice + value.price * value.quantity);
//     }, 0);

//     setTotalPrice(totalPrice);

//     setTotalQuantity(totalQuantity);

//     setCartItem(updateCartItem);
//   };

//   const deleteItem = (id) => {
//     let filterItem = cartItem.filter((value) => {
//       if (value.id === id) return false;
//       else return true;
//     });

//     let totalQuantity = filterItem.reduce((total, value) => {
//       return (total = total + value.quantity);
//     }, 0);

//     let totalPrice = filterItem.reduce((totalPrice, value) => {
//       return (totalPrice = totalPrice + value.price * value.quantity);
//     }, 0);

//     setTotalPrice(totalPrice);

//     setTotalQuantity(totalQuantity);

//     setCartItem(filterItem);
//   };
//   const value = {
//     isCartOpen,
//     setCartState,
//     cartItem,
//     addItemToCart,
//     totalQuantity,
//     isCheckoutPage,
//     setIsCheckout,
//     changeQuantity,
//     deleteItem,
//     totalPrice
//   };
//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
