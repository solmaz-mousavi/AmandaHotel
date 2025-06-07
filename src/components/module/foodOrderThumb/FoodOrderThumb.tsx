import "./foodOrderThumb.scss";
import { useGetFoodsQuery } from "../../../app/services/foodApi";
import { CartDataType, UserDataType } from "../../../dataTypes/Data.type";
import Avatar from "../../global/avatar/Avatar";
import Loader from "../../global/loader/Loader";
import Dropdown from "../../global/dropdown/Dropdown";
import LikesCount from "../../global/likesCount/LikesCount";
import { MdNoPhotography } from "react-icons/md";
import Score from "../../global/score/Score";
import CommentsCount from "../../global/commentsCount/CommentsCount";
import { Link } from "react-router-dom";
export type FoodOrderThumbPropsType = {
  id: string;
  date: string;
  price: number;
  orders: CartDataType[];
};

export default function FoodOrderThumb({
  foodOrder,
  user,
}: {
  foodOrder: FoodOrderThumbPropsType;
  user?: UserDataType;
}) {
  const { data: foods } = useGetFoodsQuery();
  if (!foods) {
    return <Loader />;
  }
  const { id, date, price, orders } = foodOrder;

  return (
    <>
      <div className="foodOrderThumb-wrapper">
        {user && <Avatar user={user} />}
				<div className="foodOrderThumb-main">

        <p>تاریخ: {date}</p>
        <p>قیمت: {price.toLocaleString()} تومان</p>
				</div>

        <Dropdown
          title="مشاهده جزئیات سفارش:"
          content={orders.map((item) => {
            const food = foods.find((i) => i.id === item.foodID);
            const { count, price, title, image } = item;
            return (
              <Link to={`/AmandaHotel/foodDetails/${food?.id}?count=${count}`}>
                <div className="order-wrapper">
                  {food && (
                    <>
                      <div className="foodOrderThumb-image">
                        {image === "" ? (
                          <MdNoPhotography className="foodOrderThumb-withoutphoto" />
                        ) : (
                          <img src={image} alt={title} />
                        )}
                      </div>
                      <div>
                        <div className="foodOrderThumb-title">
                          <p>{title}</p>
                          <Score score={food.score} />
                          <LikesCount count={food.likedUserIDs.length} />
                          <CommentsCount count={food.comments.length} />
                        </div>
                        <div className="foodOrderThumb-details">
                          <p>تعداد: {count}</p>
                          <p className="foodOrderThumb-price">
                            قیمت: {(price*count).toLocaleString()} تومان
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        />
      </div>
    </>
  );
}
