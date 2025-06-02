import { ClimbingBoxLoader } from "react-spinners";
import "./error.scss";

function Error() {
  return (
    <div className="main-error-container">
      <ClimbingBoxLoader color="red" />
      <p className="error-title">مشکلی پیش آمده، لطفا مجددا تلاش کنید</p>
    </div>
  );
}

export default Error;
