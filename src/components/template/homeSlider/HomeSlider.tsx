import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { StaticDataContext } from "../../../context/StaticContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import Aos from "../../global/aos/Aos";
import "./homeSlider.scss";

export default function HomeSlider() {
  const navigate = useNavigate();
  const { staticData } = useContext(StaticDataContext);
  return (
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
      className="mySwiper slider-wrapper"
      loop={true}
    >
      {staticData?.HomeSlider &&
        staticData.HomeSlider.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="slide-container"
              style={{
                backgroundImage: `linear-gradient( rgba(0,0,0,0.6), rgba(0,0,0,0.6) ), url(${item.image})`,
              }}
            >
              <Aos aosStyle="fadeInRight" once={false} className="slide-item">
                <h5 className="slider-title">{item.title}</h5>
                <div
                  className="slider-btn"
                  onClick={() => navigate(`${item.route}`)}
                >
                  <p className="slider-desc">{item.description}</p>
                  <FaArrowLeftLong className="slider-arrow" />
                </div>
                <img
                  src="/AmandaHotel/images/homeSlider/ineShape.webp"
                  alt=""
                  className="ineShape"
                />
              </Aos>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
