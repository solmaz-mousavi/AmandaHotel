import { useContext, useState } from "react";
import { CartDataType, FoodDataType } from "../../../dataTypes/Data.type";
import CommentsCount from "../../global/commentsCount/CommentsCount";
import Like from "../../global/like/Like";
import Score from "../../global/score/Score";
import "./menuThumb.scss";
import { AuthContext } from "../../../context/AuthContext";
import { MdNoPhotography } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidDetail } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa6";
import Input from "../../global/input/Input";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { CartContext } from "../../../context/CartContext";
import swal from "sweetalert";

export default function MenuThumb({ food }: { food: FoodDataType }) {
  const [count, setCount] = useState(1);
  const {
    id,
    image,
    title,
    score,
    comments,
    likedUserIDs,
    price,
    ingredients,
  } = food;
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const liked = userInfo ? likedUserIDs.includes(userInfo?.id) : false;
  const cartHandler = () => {
    if (userInfo) {
      const cartItem: CartDataType = {
        id: crypto.randomUUID(),
        foodID: id,
        userID: userInfo.id,
        count,
        price,
        title,
        image,
      };
      addToCart(cartItem);
    } else {
      navigate("/amandaHotel/login");
      swal({
        text: "برای سفارش غذا ابتدا باید وارد سایت شوید.",
        buttons: ["باشه"],
      });
    }
  };
  return (
    <div className="menuThumb-wrapper">
      <div className="menuThumb-top">
        <div className="menuThumb-image">
          {image === "" ? (
            <MdNoPhotography className="menuThumb-withoutphoto" />
          ) : (
            <img src={image} alt={title} />
          )}
        </div>

        <div className="menuThumb-details">
          <p className="menuThumb-title">{title}</p>
          <Score score={score} />
          <div className="menuThumb-like-comment">
            <Like liked={liked} likedCount={likedUserIDs.length} foodID={id} />
            <CommentsCount count={comments.length} />
          </div>
          <p className="menuThumb-price">
            قیمت: {price.toLocaleString()} تومان
          </p>
        </div>
      </div>

      <p className="menuThumb-ingredients">محتویات: {ingredients}</p>
      <div className="menuThumb-btn">
        <button
          className="cart-btn"
          disabled={count >= 9}
          onClick={() => setCount((prev) => prev + 1)}
        >
          <CiSquarePlus />
        </button>
        <input
          className="cart-input"
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button
          className="cart-btn"
          disabled={count <= 1}
          onClick={() => setCount((prev) => prev - 1)}
        >
          <CiSquareMinus />
        </button>

        <FaCartPlus
          className="cart-icon"
          title="اضافه به سبد خرید"
          onClick={cartHandler}
        />
        <Link
          to={`/AmandaHotel/foodDetails/${id}?strength=${2}`}
          target="_blank"
        >
          <BiSolidDetail className="details-icon" title="مشاهده جزئیات" />
        </Link>
      </div>
    </div>
  );
}
