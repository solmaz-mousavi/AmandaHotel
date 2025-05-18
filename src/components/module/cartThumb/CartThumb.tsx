import "./cartThumb.scss";
import { MdNoPhotography } from "react-icons/md";
import { CartDataType } from "../../../dataTypes/Data.type";
import { Link } from "react-router-dom";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useContext, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { CartContext } from "../../../context/CartContext";
type CartThumbPropsType = {
  cart: CartDataType;
  index: number;
};
export default function CartThumb({ cart, index }: CartThumbPropsType) {
  const { id, count, price, title, image } = cart;

  const { removeFromCart, changeCountHandler } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(count);

  const changeHandler = (newCount: number) => {
    changeCountHandler(index, cart, newCount);
		setCartCount(newCount);
  };
  return (
    <div className="cartThumb-wrapper">
      <Link
        className="cartThumb-image"
        to={`/AmandaHotel/foodDetails/${id}?strength=${2}`}
        target="_blank"
      >
        {image === "" ? (
          <MdNoPhotography className="cartThumb-withoutphoto" />
        ) : (
          <img src={image} alt={title} />
        )}
      </Link>

      <div className="cartThumb-details">
        <p className="cartThumb-title">{title}</p>

        <div className="cartThumb-count">
          <button
            className="cart-btn"
            disabled={cartCount >= 9}
            onClick={() => changeHandler(count + 1)}
          >
            <CiSquarePlus />
          </button>
          <input
            className="cart-input"
            type="number"
            value={cartCount}
            onChange={(e) =>
              changeHandler(Number(e.target.value))
            }
          />
          <button
            className="cart-btn"
            disabled={cartCount <= 1}
            onClick={() => changeHandler(count - 1)}
          >
            <CiSquareMinus />
          </button>
        </div>
        <p className="cartThumb-price">
          قیمت: {(price * cartCount).toLocaleString()} تومان
        </p>
      </div>

      <BsTrash
        className="cartThumb-delete"
        onClick={() => removeFromCart(id)}
				title="حذف آیتم از سبد خرید"
      />
    </div>
  );
}
