import { useContext } from "react";
import "./roomDetails.scss";
import { StaticDataContext } from "../../context/StaticContext";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useGetRoomQuery } from "../../app/services/roomApi";
import { getResultByID } from "../../utils/filterData";
import PageHeader from "../../components/template/pageHeader/PageHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import Score from "../../components/global/score/Score";
import Like from "../../components/global/like/Like";
import CommentsCount from "../../components/global/commentsCount/CommentsCount";
import { RoomCategoryDataType } from "../../dataTypes/StaticData.type";
import AddScore from "../../components/global/addScore/AddScore";

export default function RoomDetails() {
  const { staticData } = useContext(StaticDataContext);
  const { userInfo } = useContext(AuthContext);
  const params = useParams();
  const { data: roomInfo } = useGetRoomQuery(params.ID || "");

  if (!roomInfo || !userInfo || !staticData || !params) {
    return <PageHeader title="مشکلی پیش امده، لطفا صفحه را ریفرش کنید" />;
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
    scores,
    images,
    likedUserIDs,
    comments,
  } = roomInfo;

  const strength = new URLSearchParams(window.location.search).get("strength");
  const liked = likedUserIDs.includes(userInfo?.id);
  const roomType = staticData.roomCategory.find(item => item.id === roomTypeID)?.title
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
              <p>{`ظرفیت پایه اتاق (نفر): ${capacity}`}</p>
              <p>{`حداکثر تعداد نفرات اضافه: ${maxAddedPeople}`}</p>
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

            <Like liked={liked} likedCount={likedUserIDs.length} roomID={id} />
            <CommentsCount count={comments.length} />
          </div>
        </div>
        <p className="room-details-description">{description}</p>
        {userInfo && <AddScore roomID={id} />}
        {/* <Comment data={comments} addComment={true} /> */}
      </section>
    </>
  );
}
