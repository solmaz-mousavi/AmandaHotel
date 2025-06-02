import { DotLoader } from "react-spinners";
import "./loader.scss";

function Loader() {
  return (
    <div className="main-loader-container">
      <DotLoader color="#3ca391" />
      <p className="loader-txt">در حال بارگذاری، لطفا صبور باشید</p>
    </div>
  );
}

export default Loader;
