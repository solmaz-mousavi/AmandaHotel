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

export default function RoomDetails() {
  const { staticData } = useContext(StaticDataContext);
  const { userInfo } = useContext(AuthContext);
  const params = useParams();
  const { data: roomInfo } = useGetRoomQuery(params.ID || "");
  const [editRoom] = useEditRoomMutation();
  if (!roomInfo || !userInfo || !staticData || !params) {
    return <PageHeader title="مشکلی پیش امده، لطفا صفحه را ریفرش کنید" />;
  }

  const {
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
            <p>{`قیمت هر شب اقامت برای تعداد نفرات درخواستی شما ( ${strength} نفر) : ${totalPrice.toLocaleString()} تومان`}</p>
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
          <div className="roomDetails-cart-btn">
            <Button bgColor="var(--gold-color)">اضافه به سبد خرید</Button>
          </div>
        </div>
        <p className="room-details-description">{description}</p>
        <AddScore
          data={roomInfo}
          editDataMethod={editRoom}
          userInfo={userInfo}
        />
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
