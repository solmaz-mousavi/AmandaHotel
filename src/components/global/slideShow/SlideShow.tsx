import "./slideShow.scss";
import {
  MdOutlineClose,
  MdOutlineShare,
  MdFullscreen,
  MdOutlineFileDownload,
} from "react-icons/md";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BaseDataType } from "../../../dataTypes/Main.type";

interface DataType extends BaseDataType {
	description?:string;
};
type SlideShowPropsType = {
  data: DataType[];
  slideNumber: number;
  setShowSlider: (showWorksSlider: boolean) => void;
};

export default function SlideShow({
  data,
  slideNumber,
  setShowSlider,
}: SlideShowPropsType) {
  return (
    <div className="main-slider-container" id="main-slider">
      <div className="slider__slides">
        <Swiper
          slidesPerView={1}
          initialSlide={slideNumber}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          loop={true}
        >
          {data &&
            data.map((item, index) => (
              <SwiperSlide className="slide-item" key={item.id}>
                <div className="main-slider__icon-container">
                  {/* ---- share btns ---- */}
                  <div className="main-slider__share-container">
                    <MdOutlineShare className="main-slider__btn" />

                    <div className="main-slider-contextMenu">
                      <FacebookShareButton
                        url={item.image}
                        className="context-item"
                      >
                        <FaFacebook />
                        <span>facebook</span>
                      </FacebookShareButton>
                      <WhatsappShareButton
                        url={item.image}
                        className="context-item"
                      >
                        <FaWhatsapp />
                        <span>whatsapp</span>
                      </WhatsappShareButton>
                    </div>
                  </div>

                  {/* ---- full screen controll btn ---- */}
                  <MdFullscreen
                    className="main-slider__btn"
                    onClick={() =>
                      document
                        .getElementById("main-slider")
                        ?.requestFullscreen()
                    }
                  />

                  {/* ---- download btn ---- */}
                  <a href={item.image} download>
                    <MdOutlineFileDownload className="main-slider__btn" />
                  </a>

                  {/* ---- close modal btn ---- */}
                  <MdOutlineClose
                    className="main-slider__btn"
                    onClick={() => setShowSlider(false)}
                  />
                </div>

                {/* ---- image ---- */}
                <div className="image-wrapper">
                  <img src={item.image} alt={item.title} />
                </div>

                {/* ---- details ---- */}
                <h5>{item.title}</h5>
                {item.description && <p>{item.description}</p>}
                <div className="slideNumber">
                  {index + 1}/{data.length}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
