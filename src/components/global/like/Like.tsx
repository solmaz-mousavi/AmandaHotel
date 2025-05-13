import { FaHeart, FaRegHeart } from "react-icons/fa6";
import "./like.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  useEditRoomMutation,
  useGetRoomQuery,
} from "../../../app/services/roomApi";
import {
  useEditFoodMutation,
  useGetFoodQuery,
} from "../../../app/services/foodApi";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

type LikePropsType = {
  liked: boolean;
  likedCount: number;
  roomID?: string;
  foodID?: string;
};
export default function Like({
  liked,
  likedCount,
  roomID="",
  foodID="",
}: LikePropsType) {
  const [like, setLike] = useState(liked);
  const [likeCount, setLikeCount] = useState(likedCount);
  const { userInfo } = useContext(AuthContext);
  const [editRoom] = useEditRoomMutation();
  const [editFood] = useEditFoodMutation();
  const { data: roomInfo } = useGetRoomQuery(roomID);
  const { data: foodInfo } = useGetFoodQuery(foodID);
  const navigate = useNavigate();

  const likeHandler = async () => {
    if (userInfo && (roomInfo || foodInfo)) {
      const likedArray = (roomInfo || foodInfo)!.likedUserIDs;
      const newLikedUserIDs = likedArray.includes(userInfo?.id)
        ? likedArray.filter((i) => i !== userInfo?.id)
        : [...likedArray, userInfo?.id];
      if (roomInfo) {
        editRoom({ ...roomInfo, likedUserIDs: newLikedUserIDs });
      } else if (foodInfo) {
        editFood({ ...foodInfo, likedUserIDs: newLikedUserIDs });
      }

      setLike((prev) => !prev);
      setLikeCount(newLikedUserIDs.length);
    } else if (!userInfo) {
      navigate("/amandaHotel/login");
    } else {
      swal({
        text: "مشکلی در سمت سرور پیش آمده، لطفاً مجدادا تلاش کنید",
        buttons: ["باشه"],
      });
    }
  };

  return (
    <div className="heart" onClick={likeHandler}>
      {like ? <FaHeart /> : <FaRegHeart />}
      <span>{likeCount === 0 ? "" : likeCount}</span>
    </div>
  );
}
