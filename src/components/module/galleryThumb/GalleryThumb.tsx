import { BsCalendar3 } from "react-icons/bs";
import { GalleryDataType } from "../../../dataTypes/StaticData.type";
import Aos from "../../global/aos/Aos";
import "./galleryThumb.scss";
import { TbUsers } from "react-icons/tb";
type GalleryThumbPropsType = {
  gallery: GalleryDataType;
  index: number;
  sliderHandler: (index: number) => void;
};
export default function GalleryThumb({
  gallery,
  index,
  sliderHandler,
}: GalleryThumbPropsType) {
  const { title, date, author, image } = gallery;
  return (
    <Aos aosStyle="fadeIn" once={true}>
      <div className="galleryThumb-container" onClick={() => sliderHandler(index)}>
				<div className="galleryThumb-image">

        <img src={image} alt={title} />
				</div>
        <div className="galleryThumb-details">
          <p className="galleryThumb-subtitle">{title}</p>
          <p className="galleryThumb-desc">
            <BsCalendar3 className="galleryThumb-icon" />
            {date} - <TbUsers className="galleryThumb-icon" />
            {author}
          </p>
        </div>
      </div>
    </Aos>
  );
}
