import "./cartIcon.scss";
import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

export default function CartIcon() {
  const navigate = useNavigate();
  const { cartBadge } = useContext(CartContext);

  return (
    <div className="cart-icon-container">
      {cartBadge > 0 && (
        <span className="cart-batch" key={cartBadge}>
          {cartBadge}
        </span>
      )}
      <BsCart3 onClick={() => navigate("/amandaHotel/cart")} />
    </div>
  );
}
