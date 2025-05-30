import { FaHeart, FaRegHeart } from "react-icons/fa6";
import "./like.scss";
import {
  FoodDataType,
  RoomDataType,
  UserDataType,
} from "../../../dataTypes/Data.type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableNode } from "@table-library/react-table-library";

type LikePropsType<DataType> = {
  userInfo: UserDataType | null;
  data: DataType;
  editDataMethod: (data: any) => void;
};
export default function Like({
  userInfo,
  data,
  editDataMethod,
}: LikePropsType<RoomDataType | FoodDataType | TableNode>) {

  const [like, setLike] = useState<boolean>(
    data.likedUserIDs.includes(userInfo?.id || "")
  );
  const [likeCount, setLikeCount] = useState(data.likedUserIDs.length);
  const navigate = useNavigate();
  const likeHandler = async () => {
    if (userInfo) {
      const likedArray:string[] = data.likedUserIDs;
      const newLikedUserIDs = likedArray.includes(userInfo.id)
        ? likedArray.filter((i) => i !== userInfo.id)
        : [...likedArray, userInfo.id];
      editDataMethod({ ...data, likedUserIDs: newLikedUserIDs });

      setLike((prev) => !prev);
      setLikeCount(newLikedUserIDs.length);
    } else {
      navigate("/amandaHotel/login");
    }
  };

  return (
    <div className="heart" onClick={likeHandler}>
      {like ? <FaHeart /> : <FaRegHeart />}
      <span>{likeCount === 0 ? "" : likeCount}</span>
    </div>
  );
}
