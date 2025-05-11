import { MdNoPhotography } from "react-icons/md";
import "./roomThumb.scss";
import { addToRoomCart } from "../../../utils/addToCart";
import { useContext } from "react";
import { StaticDataContext } from "../../../context/StaticContext";
import { AuthContext } from "../../../context/AuthContext";
import { getResultByID } from "../../../utils/filterData";
import { useNavigate } from "react-router-dom";



// { room, formInfo, viewStyle }
export default function RoomThumb() {
  const navigate = useNavigate();
  // const {
  //   id,
  //   roomNumber,
  //   floor,
  //   roomTypeID,
  //   roomViewID,
  //   capacity,
  //   price,
  //   pricePerAddedPerson,
  //   score,
  //   images,
  //   likedUserIDs,
  //   comments,
  // } = room;
  // const { enterDate, exitDate, strength, reqDates } = formInfo;

  const { staticData } = useContext(StaticDataContext);
  const { userInfo } = useContext(AuthContext);
  // const liked = likedUserIDs.includes(userInfo?.id);

  // const roomType = getResultByID({data:staticData.roomCategory, ID:roomTypeID})[0].title;
  // const roomView = getResultByID(staticData.roomViews, roomViewID)[0].title;
  // const title = `اتاق ${roomType} با منظره ${roomView}`;
  // const totalPrice = (
    // price + Math.max((strength - capacity) * pricePerAddedPerson, 0)
  // ).toLocaleString();

  // const addItemToCart = () => {
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
  // };

  return (
    // <div className={`roomThumb-container ${viewStyle}`}>
      <div className="roomThumb-image">
        {/* {images.length === 0 ? (
          <MdNoPhotography className="roomThumb-withoutphoto" />
        ) : (
          <img src={images[0]} alt="aseman hotel" />
        )}
      </div>

      <div className="roomThumb-favorite">
        <Score score={score} />

        <div className="roomThumb-like-comment">
          <Like
            liked={liked}
            likedCount={likedUserIDs.length}
            roomID={id}
          />
<CommentsCount count={comments.length}/>
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
      </div> */}
    </div>
  );
}
