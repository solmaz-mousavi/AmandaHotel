import { useNavigate } from "react-router-dom";
import "./menuCategoryThumb.scss";
import { menuCategoryDataType } from "../../../dataTypes/StaticData.type";

export default function MenuCategoryThumb({
  title,
  image,
}: menuCategoryDataType) {
  const navigate = useNavigate();
  return (
    <div
      className="category-item"
      onClick={() => navigate("/AmandaHotel/menu")}
    >
      <div className="category-image">
        <img src={image} alt={title} />
      </div>
      <p className="category-title">{title}</p>
    </div>
  );
}
