import { FaRegStar, FaStar } from "react-icons/fa6";
import "./addScore.scss";
import { useContext, useEffect, useState } from "react";
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

type AddScorePropsType = {
  roomID?: string;
  foodID?: string;
};
export default function AddScore({
  roomID = "",
  foodID = "",
}: AddScorePropsType) {
  const { userInfo } = useContext(AuthContext);
  const [editRoom] = useEditRoomMutation();
  const [editFood] = useEditFoodMutation();
  const { data: roomInfo } = useGetRoomQuery(roomID);
  const { data: foodInfo } = useGetFoodQuery(foodID);
  const navigate = useNavigate();

  const stars = [1, 2, 3, 4, 5];
  const [score, setScore] = useState(0);
  // const [userScore, setUserScore] = useState<number | null>(null);

  useEffect(() => {
    if (userInfo && (roomInfo || foodInfo)) {
      const scoreArray = (roomInfo || foodInfo)!.scores;

      const userScore =
        scoreArray && scoreArray.find((item) => item.userID === userInfo.id);
      if (userScore) {
        // setUserScore(userScore.score);
        setScore(userScore.score);
      }
    }
  }, [roomInfo, foodInfo, userInfo]);

  const scoreHandler = (score: number) => {
    if (userInfo && (roomInfo || foodInfo)) {
      const scoreArray = (roomInfo || foodInfo)!.scores.filter(
        (item) => item.userID !== userInfo?.id
      );
      const newScoreArray = [
        ...scoreArray,
        { userID: userInfo?.id, score: score },
      ];
      const newScore =
        newScoreArray.map((item) => item.score).reduce((a, b) => a + b) /
        newScoreArray.length;

      if (roomInfo) {
        editRoom({ ...roomInfo, scores: newScoreArray, score: newScore });
      } else if (foodInfo) {
        editFood({ ...foodInfo, scores: newScoreArray, score: newScore });
      }

      setScore(score);
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
    <div className="add-score-container">
      <h3 className="add-score-title">
        {score > 0
          ? "شما قبلا به این آیتم امتیاز داده اید. برای تغییر امتیاز خود روی ستاره ها کلیک کنید:"
          : "شما قبلا به این آیتم امتیاز نداده اید. برای امتیازدهی روی ستاره ها کلیک کنید:"}
      </h3>

      <div className="add-score">
        {stars.map((item, index) => {
          if (item <= score) {
            return (
              <FaStar
                className="score-icon animate__animated animate__swing"
                key={item}
                onClick={() => scoreHandler(index + 1)}
              />
            );
          } else {
            return (
              <FaRegStar
                className="score-icon animate__animated animate__swing"
                key={item}
                onClick={() => scoreHandler(index + 1)}
              />
            );
          }
        })}
        <p className="score">
          {" "}
          {"("} {score} {")"}
        </p>
      </div>
    </div>
  );
}
