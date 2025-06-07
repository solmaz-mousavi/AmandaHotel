import { MdNoPhotography } from "react-icons/md";
import { RoomDataType, UserDataType } from "../../../dataTypes/Data.type";
import Score from "../../global/score/Score";
import CommentsCount from "../../global/commentsCount/CommentsCount";
import LikesCount from "../../global/likesCount/LikesCount";
import Avatar from "../../global/avatar/Avatar";
import { Link } from "react-router-dom";
import "./roomReservationThumb.scss";
export type RoomReservationThumbPropsType = {
  room: RoomDataType;
  user: UserDataType;
  enterdate: string;
  exitdate: string;
  price: number;
  strength: number;
  dates: string[];
  id: string;
};

export default function RoomReservationThumb({
  roomReservation,
}: {
  roomReservation: RoomReservationThumbPropsType;
}) {
  const { room, user, enterdate, exitdate, price, strength, dates, id } =
    roomReservation;
  return (
    <Link to={`/AmandaHotel/roomDetails/${id}?strength=${strength}`}>
      <div className="RoomReservationThumb-wrapper">
        <Avatar user={user} />
        <div className="RoomReservationThumb-image">
          {room.images.length === 0 ? (
            <MdNoPhotography className="RoomReservationThumb-withoutphoto" />
          ) : (
            <img src={room?.images[0]} alt="amanda hotel" />
          )}
        </div>
        <div>
          <div className="RoomReservationThumb-title">
            <p>اتاق شماره {room?.roomNumber}</p>
            <Score score={room.score} />
            <CommentsCount count={room.comments.length} />
            <LikesCount count={room.likedUserIDs.length} />
          </div>
          <div className="RoomReservationThumb-details">
            <p>تاریخ ورود: {enterdate} </p>
            <p>تاریخ خروج: {exitdate} </p>
            <p>مدت اقامت: {dates.length} روز </p>
            <p>تعداد نفرات: {strength} نفر </p>
          </div>
          <p className="RoomReservationThumb-price">
            مبلغ: {price.toLocaleString()} تومان
          </p>
        </div>
      </div>
    </Link>
  );
}
