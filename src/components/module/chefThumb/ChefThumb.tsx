import { StaffDataType } from "../../../dataTypes/Data.type";
import "./chefThumb.scss";

export default function ChefThumb({ chef }: { chef: StaffDataType }) {
  const { image, name, description } = chef;
  return (
    <div className="chefThumb-container">
      <div className="chefThumb-image">
        <img src={image} alt={name} />
      </div>
      <p className="chefThumb-name">{name}</p>
      <p className="chefThumb-desc">سرآشپز</p>
      <p className="chefThumb-desc">{description}</p>
    </div>
  );
}
