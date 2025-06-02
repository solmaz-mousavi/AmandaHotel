import { FaRegTimesCircle } from "react-icons/fa";
import "./notFound.scss";

export default function NotFound() {
  return (
    <div className={`notfound-container`}>
      <FaRegTimesCircle className="notfound-icon" />
      <p className="notfound-txt">صفحه مورد نظر یافت نشد</p>
    </div>
  );
}
