import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../crown.svg";
import "./navigation.style.scss";

import { signOutUser } from "../../utils/firebase";
//import { ProductsContext } from "../../contexts/products.context";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropDown from "../../component/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";

const Navigation = () => {
  //const { currentUser } = useContext(UserContext);
  //console.log("Heloodsflsdkjfsdsjfdlfj", currentUser);

  const currentUser = useSelector((store) => store.user.currentUser);

  //const { products } = useContext(ProductsContext);
  //console.log(products);
  const { isCartOpen } = useContext(CartContext);

  //console.log("value of cart", isCartOpen);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
