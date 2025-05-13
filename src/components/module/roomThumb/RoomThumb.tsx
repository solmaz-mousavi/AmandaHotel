import { MdNoPhotography } from "react-icons/md";
import "./roomThumb.scss";
import { addToRoomCart } from "../../../utils/addToCart";
import { useContext } from "react";
import { StaticDataContext } from "../../../context/StaticContext";
import { AuthContext } from "../../../context/AuthContext";
import { getResultByID } from "../../../utils/filterData";
import { useNavigate } from "react-router-dom";
import { RoomDataType } from "../../../dataTypes/Data.type";
import { RoomCategoryDataType, StaticDataType } from "../../../dataTypes/StaticData.type";
import { log } from "console";
import Score from "../../global/score/Score";
import Like from "../../global/like/Like";
import CommentsCount from "../../global/commentsCount/CommentsCount";
import { FaCartPlus } from "react-icons/fa6";
import { BiSolidDetail } from "react-icons/bi";

type RoomThumbPropsType = {
	room: RoomDataType;
viewStyle: "grid" | "list";
formInfo: {[key:string]:any};
}


// { room, formInfo, viewStyle }
export default function RoomThumb({room,
	viewStyle,
	formInfo}: RoomThumbPropsType) {
  const navigate = useNavigate();
  const {
    id,
    roomNumber,
    floor,
    roomTypeID,
    capacity,
    price,
    pricePerAddedPerson,
    score,
    images,
    likedUserIDs,
    comments,
  } = room;
  const { enterDate, exitDate, strength, reqDates } = formInfo;

  const { staticData } = useContext(StaticDataContext);
  const { userInfo } = useContext(AuthContext);

  const liked = userInfo ? likedUserIDs.includes(userInfo?.id) : false;

  const roomType = staticData.roomCategory.find(item => item.id === roomTypeID)?.title;

  const title = `اتاق ${roomType}`;
  const totalPrice = (
    price + Math.max((strength - capacity) * pricePerAddedPerson, 0)
  ).toLocaleString();

  const addItemToCart = () => {
  //   const roomCartItem = {
  //     id: crypto.randomUUID(),
  //     userID: userInfo.id,
  //     roomID: id,
  //     title,
  //     roomNumber,
  //     strength,
  //     PricePerDay: totalPrice,
  //     enterDate: enterDate.format(),
  //     exitDate: exitDate.format(),
  //     duration: reqDates.length,
  //     totalPrice: totalPrice * reqDates.length,
  //     images,
  //   };
  //   addToRoomCart(roomCartItem);
  };

  return (
    <div className={`roomThumb-container ${viewStyle}`}>
      <div className="roomThumb-image">
		
        {images.length === 0 ? (
          <MdNoPhotography className="roomThumb-withoutphoto" />
        ) : (
          <img src={images[0]} alt="aseman hotel" />
        )}
      </div>

      <div className="roomThumb-favorite">
        <Score score={score} />

        <div className="roomThumb-like-comment">
          {/* <Like
            liked={liked}
            likedCount={likedUserIDs.length}
            roomID={id}
          /> */}
{/* <CommentsCount count={comments.length}/> */}
        </div>
      </div>

      <div className="roomThumb-details">
        <p className="roomThumb-title">{title}</p>
        <p>طبقه: {floor}</p>
        <p>شماره اتاق: {roomNumber}</p>
        <p>
          قیمت هر شب اقامت برای {strength} نفر: {totalPrice} تومان
        </p>
      </div>
      <div className="roomThumb-btn">
        <BiSolidDetail
          title="مشاهده جزئیات"
          onClick={() =>
            navigate(`/aseman-hotel/roomDetails/${id}?strength=${strength}`)
          }
        />
        <FaCartPlus title="اضافه به سبد خرید" onClick={addItemToCart} />
      </div>
    </div>
  );
}
