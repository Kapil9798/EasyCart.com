import { useContext } from "react";
import CheckoutItem from "../../component/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";

const CheckoutPage = () => {
  const { cartItem, totalPrice } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItem &&
        cartItem.map((cartItem) => {
          return <CheckoutItem cartItem={cartItem} />;
        })}
      <span className="total"> Total: {totalPrice} &#8377; </span>
    </div>
  );
};

export default CheckoutPage;
