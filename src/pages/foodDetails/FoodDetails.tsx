import { useContext, useState } from "react";
import "./foodDetails.scss";
import { StaticDataContext } from "../../context/StaticContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditFoodMutation,
  useGetFoodQuery,
} from "../../app/services/foodApi";
import PageHeader from "../../components/template/pageHeader/PageHeader";
import Button from "../../components/global/button/Button";
import AddScore from "../../components/global/addScore/AddScore";
import Comment from "../../components/global/comment/Comment";
import AddComment from "../../components/global/addComment/AddComment";
import Score from "../../components/global/score/Score";
import Like from "../../components/global/like/Like";
import CommentsCount from "../../components/global/commentsCount/CommentsCount";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { CartDataType } from "../../dataTypes/Data.type";
import { CartContext } from "../../context/CartContext";
import swal from "sweetalert";
import { MdNoPhotography } from "react-icons/md";
import Loader from "../../components/global/loader/Loader";

export default function FoodDetails() {
  const count = new URLSearchParams(window.location.search).get("count");
  const { staticData } = useContext(StaticDataContext);
  const { userInfo } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const params = useParams();
  const navigate = useNavigate();
  const { data: foodInfo } = useGetFoodQuery(params.ID || "");
  const [editFood] = useEditFoodMutation();
  const [foodCount, setFodCount] = useState(Number(count));

  if (!foodInfo || !userInfo || !staticData || !params) {
    return <Loader />;
  }

  const { id, title, ingredients, price, description, score, image, comments } =
    foodInfo;

  const cartHandler = () => {
    if (userInfo) {
      const cartItem: CartDataType = {
        id: crypto.randomUUID(),
        foodID: id,
        userID: userInfo.id,
        count: foodCount,
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
    <>
      <PageHeader title={title} />

      <section className="foodDetails-wrapper container">
        <div className="foodDetails-top">
          <div className="foodDetails-container">
            <p>{`محتویات: ${ingredients}`}</p>
            <p>{`قیمت : ${(
              price * Number(foodCount)
            ).toLocaleString()} تومان`}</p>
            <div className="foodDetails-count">
              <button
                className="cart-btn"
                disabled={foodCount >= 9}
                onClick={() => setFodCount((prev) => prev + 1)}
              >
                <CiSquarePlus />
              </button>
              <input
                className="cart-input"
                type="number"
                value={foodCount}
                onChange={(e) => setFodCount(Number(e.target.value))}
              />
              <button
                className="cart-btn"
                disabled={foodCount <= 1}
                onClick={() => setFodCount((prev) => prev - 1)}
              >
                <CiSquareMinus />
              </button>
              <Button
                bgColor="var(--gold-color)"
                className="foodDetails-cart-btn"
                onClick={cartHandler}
              >
                اضافه به سبد خرید
              </Button>
            </div>
          </div>

          <div className="foodDetails-slider-image">
            {image === "" ? (
              <MdNoPhotography className="menuThumb-withoutphoto" />
            ) : (
              <img src={image} alt={title} />
            )}
          </div>

          <div className="foodDetails-like-score-comment">
            <Score score={score} />

            <Like
              data={foodInfo}
              editDataMethod={editFood}
              userInfo={userInfo}
            />
            <CommentsCount count={comments.length} />
          </div>
        </div>

        <p className="foodDetails-description">{description}</p>
        <AddScore
          data={foodInfo}
          editDataMethod={editFood}
          userInfo={userInfo}
        />
        <Comment comments={comments} />
        <AddComment
          data={foodInfo}
          editDataMethod={editFood}
          userInfo={userInfo}
        />
      </section>
    </>
  );
}
