import "./logo.scss";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/AmandaHotel">
      <div className="logo-wrapper">
        <img
          className="logo"
          src="/AmandaHotel/images/logo.png"
          alt="AmandaHotel"
        />
        <p className="hotelName">هتل آمـــــــاندا</p>
      </div>
    </Link>
  );
}
