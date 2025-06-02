import { useContext } from "react";
import "./roomDetails.scss";
import { StaticDataContext } from "../../context/StaticContext";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import {
  useEditRoomMutation,
  useGetRoomQuery,
} from "../../app/services/roomApi";
import PageHeader from "../../components/template/pageHeader/PageHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import Score from "../../components/global/score/Score";
import Like from "../../components/global/like/Like";
import CommentsCount from "../../components/global/commentsCount/CommentsCount";
import AddScore from "../../components/global/addScore/AddScore";
import Comment from "../../components/global/comment/Comment";
import AddComment from "../../components/global/addComment/AddComment";
import Button from "../../components/global/button/Button";
import { useGetRoomReservationsQuery } from "../../app/services/roomReservationApi";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_fa";
import Loader from "../../components/global/loader/Loader";

export default function RoomDetails() {
  const { staticData } = useContext(StaticDataContext);
  const { userInfo } = useContext(AuthContext);
  const params = useParams();
  const { data: roomInfo } = useGetRoomQuery(params.ID || "");
  const { data: roomReservations } = useGetRoomReservationsQuery();
  const [editRoom] = useEditRoomMutation();
  if (!roomInfo || !userInfo || !staticData || !params || !roomReservations) {
    return <Loader />;
  }

  const {
    id,
    roomNumber,
    floor,
    roomTypeID,
    capacity,
    price,
    pricePerAddedPerson,
    maxAddedPeople,
    description,
    score,
    images,
    comments,
  } = roomInfo;

  const reservedDatesValues = roomReservations
    .filter((item) => item.roomID === id)
    .map((item) => {
      const enterDayArray = item.dates[0].split("/");
      const exitDayArray = item.dates[item.dates.length - 1].split("/");
      return [
        new DateObject().set({
          calendar: persian,
          locale: persian_en,
          year: Number(enterDayArray[0]),
          month: Number(enterDayArray[1]),
          day: Number(enterDayArray[2]),
        }),
        new DateObject().set({
          calendar: persian,
          locale: persian_en,
          year: Number(exitDayArray[0]),
          month: Number(exitDayArray[1]),
          day: Number(exitDayArray[2]),
        }),
      ];
    });

  const strength = new URLSearchParams(window.location.search).get("strength");
  const roomType = staticData.roomCategory.find(
    (item) => item.id === roomTypeID
  )?.title;
  const title = `اتاق ${roomType} به شماره ${roomNumber} واقع در طبقه ${floor}`;
  const totalPrice = (
    price + Math.max((Number(strength) - capacity) * pricePerAddedPerson, 0)
  ).toLocaleString();

  return (
    <>
      <PageHeader title={title} />

      <section className="roomDetails-wrapper container">
        <div className="roomDetails-top">
          <div className="details-container">
            <p>{`شماره اتاق: ${roomNumber}`}</p>
            <p>{`طبقه: ${floor}`}</p>
            <p>{`ظرفیت پایه اتاق: ${capacity} نفر`}</p>
            <p>{`حداکثر تعداد نفرات اضافه: ${maxAddedPeople} نفر`}</p>
            <p>{`قیمت پایه : ${price.toLocaleString()} تومان`}</p>
            <p>{`اضافه بها به ازای هر نفر اضافه : ${pricePerAddedPerson.toLocaleString()} تومان`}</p>
            {Number(strength) ? (
              <p>{`قیمت هر شب اقامت برای تعداد نفرات درخواستی شما ( ${strength} نفر) : ${totalPrice.toLocaleString()} تومان`}</p>
            ) : (
              <></>
            )}
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={5}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper roomDetails-slider-wrapper"
            loop={true}
          >
            {images.map((item, index) => (
              <SwiperSlide className="roomDetails-slider-item" key={index}>
                <h5 className="roomDetails-slider-title">{title}</h5>

                <img
                  src={item}
                  alt={title}
                  className="roomDetails-slider-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="roomDetails-like-score-comment">
            <Score score={score} />

            <Like
              data={roomInfo}
              editDataMethod={editRoom}
              userInfo={userInfo}
            />
            <CommentsCount count={comments.length} />
          </div>
          {Number(strength) ? (
            <div className="roomDetails-cart-btn">
              <Button bgColor="var(--gold-color)">اضافه به سبد خرید</Button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <p className="room-details-description">{description}</p>

<div className="roomDetails-cal-score">

        <div className="calendar-wrapper">
        <h5 className="roomDetails-subTitle">
          مشاهده روزهایی که اتاق رزرو شده است:
        </h5>
          <Calendar
            value={reservedDatesValues}
            calendar={persian}
            locale={persian_en}
            multiple
            range
						readOnly={true}
						/>
        </div>

        <AddScore
          data={roomInfo}
          editDataMethod={editRoom}
          userInfo={userInfo}
					/>
					</div>
        <Comment comments={comments} />
        <AddComment
          data={roomInfo}
          editDataMethod={editRoom}
          userInfo={userInfo}
        />
      </section>
    </>
  );
}
