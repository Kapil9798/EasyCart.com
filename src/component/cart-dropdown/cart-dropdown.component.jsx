import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

const CartDropDown = () => {
  const { cartItem } = useContext(CartContext);

  const navigate = useNavigate();

  const checkoutHandler = () => {
    // setIsCheckout(!isCheckoutPage);

    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItem.map((item) => {
          return <CartItem cartProduct={item} />;
        })}
      </div>
      <Button onClick={checkoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropDown;
