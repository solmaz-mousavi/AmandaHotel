import { MdNoPhotography } from "react-icons/md";
import "./roomThumb.scss";
import { useContext } from "react";
import { StaticDataContext } from "../../../context/StaticContext";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
	NewRoomReservationDataType,
  RoomDataType,
} from "../../../dataTypes/Data.type";
import Score from "../../global/score/Score";
import swal from "sweetalert";
import CommentsCount from "../../global/commentsCount/CommentsCount";
import { BiSolidDetail } from "react-icons/bi";
import Like from "../../global/like/Like";
import { useAddRoomReservationMutation } from "../../../app/services/roomReservationApi";
import Button from "../../global/button/Button";
import { useEditRoomMutation } from "../../../app/services/roomApi";

type RoomThumbPropsType = {
  room: RoomDataType;
  viewStyle: "grid" | "list";
  formInfo: { [key: string]: any };
};

// { room, formInfo, viewStyle }
export default function RoomThumb({
  room,
  viewStyle,
  formInfo,
}: RoomThumbPropsType) {
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
    comments,
  } = room;
  const { enterDate, exitDate, strength, reqDates } = formInfo;

  const { staticData } = useContext(StaticDataContext);
  const { userInfo } = useContext(AuthContext);
	const [editRoom] = useEditRoomMutation();
  const [addRoomReservation] = useAddRoomReservationMutation();
  const roomType = staticData.roomCategory.find(
    (item) => item.id === roomTypeID
  )?.title;
  const title = `اتاق ${roomType}`;
  const totalPrice = (
    price + Math.max((strength - capacity) * pricePerAddedPerson, 0)
  ).toLocaleString();

  const roomReservationHandler = async () => {
    if (userInfo) {
      const newReservation: NewRoomReservationDataType = {
        dates: reqDates,
        roomID: id,
        userID: userInfo.id,
        strength: Number(strength),
        price: Number(totalPrice.replace(/,/g, "")),
      };
      await addRoomReservation(newReservation);
      swal({
        text: `اتاق شماره ${roomNumber} از تاریخ ${enterDate} تا تاریخ ${exitDate} برای شما رزرو گردید.`,
        buttons: ["باشه"],
      });
    } else {
      swal({
        text: "برای امکان رزرو اتاق باید ابندا وارد سایت شوید.",
        buttons: ["باشه"],
      });
      navigate("/amandaHotel/login");
    }
  };

  return (
    <div className={`roomThumb-container ${viewStyle}`}>
      <div className="roomThumb-image">
        {images.length === 0 ? (
          <MdNoPhotography className="roomThumb-withoutphoto" />
        ) : (
          <img src={images[0]} alt="amanda hotel" />
        )}
      </div>

      <div className="roomThumb-favorite">
        <Score score={score} />

        <div className="roomThumb-like-comment">
          <Like data={room} editDataMethod={editRoom} userInfo={userInfo} />
          <CommentsCount count={comments.length} />
        </div>
      </div>

      <div className="roomThumb-details">
        <p className="roomThumb-title">{title}</p>
        <p>طبقه: {floor}</p>
        <p>شماره اتاق: {roomNumber}</p>
        <p>قیمت پایه: {price.toLocaleString()} تومان </p>
        <p>
          قیمت هر شب اقامت برای {strength} نفر: {totalPrice} تومان
        </p>
      </div>

      <div className="roomThumb-btn">
        <Link
          to={`/AmandaHotel/roomDetails/${id}?strength=${strength}`}
          target="_blank"
        >
          <BiSolidDetail title="مشاهده جزئیات" />
        </Link>
        <Button 
          innerHtml="ثبت سفارش"
          onClick={roomReservationHandler}
					bgColor="var(--gold-color)"
					className="roomThumb-button"
        />
      </div>
    </div>
  );
}
