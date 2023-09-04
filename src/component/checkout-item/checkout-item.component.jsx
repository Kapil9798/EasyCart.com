import "./checkout-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { id, name, imageUrl, price, quantity } = cartItem;
  const { changeQuantity, deleteItem } = useContext(CartContext);

  const incrementHandler = () => {
    console.log("increment");
    changeQuantity(cartItem, "increment");
  };

  const decrementHandler = () => {
    changeQuantity(cartItem, "decrement");
  };

  const deleteHandler = () => {
    deleteItem(cartItem);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => decrementHandler()}>
          &#10094;
        </div>
        {quantity}
        <div className="arrow" onClick={() => incrementHandler()}>
          &#10095;
        </div>
      </span>
      <div className="price"> {price}</div>
      {/* onClick={() => deleteHandler(id)} */}
      <div className="remove-button" onClick={() => deleteHandler()}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
