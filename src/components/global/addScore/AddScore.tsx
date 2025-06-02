import { FaRegStar, FaStar } from "react-icons/fa6";
import "./addScore.scss";
import { useEffect, useState } from "react";
import { UserDataType } from "../../../dataTypes/Data.type";
import { ScoreDataType } from "../../../dataTypes/Main.type";

type AddScorePropsType<T> = {
  userInfo: UserDataType | null;
  data: T;
  editDataMethod: (data: any) => void;
};
export default function AddScore<T extends {scores: ScoreDataType[]}>({
  userInfo,
  data,
  editDataMethod,
}: AddScorePropsType<T>) {

  const stars = [1, 2, 3, 4, 5];
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (userInfo && data) {
      const scoreArray = data.scores;

      const userScore =
        scoreArray && scoreArray.find((item) => item.userID === userInfo.id);
      if (userScore) {
        setScore(userScore.score);
      }
    }
  }, [data, userInfo]);

  const scoreHandler = (score: number) => {
    if (userInfo && data) {
      const scoreArray = data.scores.filter(
        (item) => item.userID !== userInfo?.id
      );
      const newScoreArray = [
        ...scoreArray,
        { userID: userInfo.id, score: score },
      ];
      const newScore =
        newScoreArray.map((item) => item.score).reduce((a, b) => a + b) /
        newScoreArray.length;
      editDataMethod({ ...data, scores: newScoreArray, score: newScore });
      setScore(score);
    }
  };

	if (!userInfo) {
    return <></>;
  }

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
