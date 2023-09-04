import "./cart-item.styles.scss";

const CartItem = ({ cartProduct }) => {
  const { id, imageUrl, name, price, quantity } = cartProduct;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <div className="name">{name}</div>
        <div className="price">
          {quantity} * ${price}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
